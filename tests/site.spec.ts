import { test, expect } from "@playwright/test";

for (const width of [320, 360, 390, 480, 768, 1024, 1440, 1920]) {
  test(`layout sem transbordamento em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Comida de verdade.Boa companhia.Sinta-se em casa.",
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    const overflow = await page
      .locator("main a, main button, .header-actions a, summary")
      .evaluateAll((elements) =>
        elements
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return (
              rect.width > 0 &&
              (rect.left < -1 ||
                rect.right > innerWidth + 1 ||
                rect.height < 43)
            );
          })
          .map((element) => element.textContent?.trim()),
      );
    expect(overflow).toEqual([]);
    await expect(page.locator("#visita")).toBeAttached();
    expect(errors).toEqual([]);
  });
}

test("filtros mostram as fotos da categoria selecionada", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".food-tile")).toHaveCount(6);
  for (const [category, count] of [
    ["Doces", 1],
    ["Buffet", 2],
    ["Da cozinha", 3],
    ["Tudo", 6],
  ] as const) {
    const filter = page.getByRole("button", { name: category, exact: true });
    await filter.click();
    await expect(filter).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".food-tile")).toHaveCount(count);
    await expect(page.locator(".gallery-count")).toContainText(
      `${String(count).padStart(2, "0")} ${count === 1 ? "foto" : "fotos"}`,
    );
  }
});

test("galeria abre, navega em ciclo e devolve o foco", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", {
    name: "Ampliar foto: Buffet",
    exact: true,
  });
  await trigger.click();
  const dialog = page.locator("dialog");
  await expect(dialog).toBeVisible();
  await expect(page.locator("#gallery-photo-title")).toHaveText("Buffet");
  await page
    .getByRole("button", { name: "Foto anterior", exact: true })
    .click();
  await expect(page.locator("#gallery-photo-title")).toHaveText("Sobremesa");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#gallery-photo-title")).toHaveText("Buffet");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#gallery-photo-title")).toHaveText(
    "Lasanha de carne",
  );
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator("#gallery-photo-title")).toHaveText("Buffet");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await trigger.click();
  await page
    .getByRole("button", { name: "Fechar galeria", exact: true })
    .click();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.mouse.click(5, 5);
  await expect(dialog).not.toBeVisible();
});

test("links de contato e navegação têm destinos válidos", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const contacts = await page
    .locator('a[href^="https://wa.me/"]')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).href),
    );
  expect(contacts.length).toBeGreaterThan(4);
  for (const href of contacts) {
    const url = new URL(href);
    expect(url.pathname).toBe("/5592982282194");
    expect(url.searchParams.get("text")).toContain("Olá!");
  }
  await expect(
    page.getByRole("link", { name: /Traçar rota no Google Maps/ }),
  ).toHaveAttribute("href", /destination=Restaurante\+Mamori/);
  for (const link of await page.locator('a[target="_blank"]').all()) {
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).toHaveAttribute("rel", /noreferrer/);
  }
  for (const link of await page.locator('a[href^="#"]').all()) {
    const href = await link.getAttribute("href");
    expect(href).not.toBe("#");
    await expect(page.locator(href!)).toHaveCount(1);
  }
  await page.locator("#sabores").scrollIntoViewIfNeeded();
  const mainNav = page.getByRole("navigation", {
    name: "Principal",
    exact: true,
  });
  await expect(
    mainNav.getByRole("link", { name: "Nossos sabores" }),
  ).toHaveAttribute("aria-current", "location");
  await page
    .getByRole("link", { name: "Mamori — voltar ao início", exact: true })
    .first()
    .click();
  await expect(mainNav.locator("a[aria-current]")).toHaveCount(0);
});

test("teclado acessa o conteúdo e movimento reduzido é respeitado", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#conteudo$/);
  await expect(page.locator("#conteudo")).toBeFocused();
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await expect(page.locator("h1")).toHaveCSS("animation-name", "none");
});

test.describe("interações no celular", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test("menu fecha com Escape, toque fora, link e mudança para desktop", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const toggle = page.locator("summary");
    const details = page.locator("details");
    await toggle.tap();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(details).not.toHaveAttribute("open");
    await expect(toggle).toBeFocused();
    await toggle.tap();
    // Toque real na margem externa do painel.
    await page.touchscreen.tap(3, 78);
    await expect(details).not.toHaveAttribute("open");
    await toggle.tap();
    await page
      .getByRole("navigation", { name: "Navegação móvel" })
      .getByRole("link", { name: /Nossos sabores/ })
      .tap();
    await expect(details).not.toHaveAttribute("open");
    await expect(page).toHaveURL(/#sabores$/);
    await toggle.tap();
    await page.setViewportSize({ width: 1024, height: 900 });
    await expect(details).not.toHaveAttribute("open");
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(details).not.toHaveAttribute("open");
  });

  test("galeria aceita deslize horizontal e ignora gesto vertical", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Doces", exact: true }).tap();
    await page
      .getByRole("button", { name: "Ampliar foto: Sobremesa", exact: true })
      .tap();
    await expect(page.locator("#gallery-photo-title")).toHaveText("Sobremesa");
    const swipe = async (dx: number, dy: number) =>
      page.locator(".dialog-image").evaluate(
        (target, delta) => {
          const touch = (x: number, y: number) =>
            new Touch({ identifier: 1, target, clientX: x, clientY: y });
          target.dispatchEvent(
            new TouchEvent("touchstart", {
              bubbles: true,
              touches: [touch(250, 250)],
            }),
          );
          target.dispatchEvent(
            new TouchEvent("touchend", {
              bubbles: true,
              changedTouches: [touch(250 + delta.dx, 250 + delta.dy)],
            }),
          );
        },
        { dx, dy },
      );
    await swipe(-100, 5);
    await expect(page.locator("#gallery-photo-title")).toHaveText("Buffet");
    await swipe(80, 150);
    await expect(page.locator("#gallery-photo-title")).toHaveText("Buffet");
    await page
      .getByRole("button", { name: "Fechar galeria", exact: true })
      .tap();
    await expect(
      page.getByRole("button", {
        name: "Ampliar foto: Sobremesa",
        exact: true,
      }),
    ).toBeFocused();
  });

  test("contato fixo aparece ao rolar e sai ao chegar no rodapé", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(
      page.getByRole("complementary", { name: "Contato rápido" }),
    ).toHaveCount(0);
    await page.locator("#sabores").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("complementary", { name: "Contato rápido" }),
    ).toBeVisible();
    await page.locator(".site-footer").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("complementary", { name: "Contato rápido" }),
    ).toHaveCount(0);
  });
});

test("menu nativo funciona mesmo sem JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await page.locator("summary").click();
  await expect(
    page.getByRole("navigation", { name: "Navegação móvel" }),
  ).toBeVisible();
  await page.locator("summary").click();
  await expect(
    page.getByRole("navigation", { name: "Navegação móvel" }),
  ).not.toBeVisible();
  await context.close();
});

test("fotos reais carregam e a página não registra erros", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/", { waitUntil: "networkidle" });
  for (const image of await page.locator("main img:visible").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(
      await image.evaluate(
        (element) => (element as HTMLImageElement).naturalWidth,
      ),
    ).toBeGreaterThan(0);
  }
  expect(errors).toEqual([]);
});

test.describe("efeito de mouse", () => {
  test.use({ reducedMotion: "no-preference" });

  test("acompanha o ponteiro, reage aos botões e permite clicar", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const effect = page.locator(".cursor-effects");
    await expect(effect).toHaveAttribute("data-enabled", "true");
    await page.mouse.move(800, 180);
    await page.mouse.move(950, 240);
    await expect(effect).toHaveAttribute("data-visible", "true");
    await expect
      .poll(async () => {
        const box = await page.locator(".cursor-ring").boundingBox();
        return box
          ? Math.hypot(
              box.x + box.width / 2 - 950,
              box.y + box.height / 2 - 240,
            )
          : 100;
      })
      .toBeLessThan(1);
    const filter = page.getByRole("button", { name: "Doces", exact: true });
    await filter.scrollIntoViewIfNeeded();
    await filter.hover();
    await expect(effect).toHaveAttribute("data-interactive", "true");
    await filter.click();
    await expect(page.locator(".food-tile")).toHaveCount(1);
    await page.keyboard.press("Tab");
    await expect(effect).toHaveAttribute("data-visible", "false");
  });

  test("desativa imediatamente ao preferir movimento reduzido", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const effect = page.locator(".cursor-effects");
    await page.mouse.move(500, 300);
    await expect(effect).toHaveAttribute("data-visible", "true");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(effect).toHaveAttribute("data-enabled", "false");
    await expect(effect).toHaveCSS("display", "none");
    await page.mouse.move(600, 350);
    await expect(effect).toHaveAttribute("data-visible", "false");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(effect).toHaveAttribute("data-enabled", "true");
    await page.mouse.move(700, 350);
    await expect(effect).toHaveAttribute("data-visible", "true");
  });
});

test("efeito de mouse fica desativado em tela de toque", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto(baseURL!, { waitUntil: "networkidle" });
  await expect(page.locator(".cursor-effects")).toHaveAttribute(
    "data-enabled",
    "false",
  );
  await expect(page.locator(".cursor-effects")).toHaveCSS("display", "none");
  await page.getByRole("button", { name: "Doces", exact: true }).tap();
  await expect(page.locator(".food-tile")).toHaveCount(1);
  await context.close();
});

import type { NextConfig } from "next";

// Origens locais usadas no desenvolvimento e nos testes de interface.
// O IP da rede local da versão original continua permitido para testes no celular.
const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "192.168.1.5"],
};

export default nextConfig;

FROM nixos/nix

RUN nix-env -iA nixpkgs.deno

EXPOSE 8080

WORKDIR /app

ADD . .
RUN deno cache mod.ts

CMD ["deno", "run", "-A", "--unstable", "mod.ts"]
#!/bin/bash
# Baut die vier Swift-Werkzeuge nach bin/. Dauert beim ersten Mal etwa eine Minute.
set -e
cd "$(dirname "$0")"
mkdir -p bin
for w in cdp ana img comp; do
  echo "baue $w"
  swiftc -O "$w.swift" -o "bin/$w"
done
echo "fertig: $(ls bin | tr '\n' ' ')"

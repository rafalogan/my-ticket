#!/usr/bin/env zsh

ROOT_DIR="./src/modules"

if [ ! -d "$ROOT_DIR" ]; then
	mkdir -p "$ROOT_DIR"
fi


if [ ! -d "$ROOT_DIR/$1" ]; then
	mkdir -p "$ROOT_DIR/$1" &&
	touch "$ROOT_DIR/$1/index.ts"
fi

if [ ! -f "$ROOT_DIR/$1/index.ts" ]; then
	touch "$ROOT_DIR/$1/index.ts"
fi

touch "$ROOT_DIR/$1/$1.controller.ts"  &&
touch "$ROOT_DIR/$1/$1.route.ts"  &&
touch "$ROOT_DIR/$1/$1.module.ts"  &&

echo "export * from './$1.controller';
export * from './$1.route';
export * from './$1.module';" >> "$ROOT_DIR/$1/index.ts" &&

echo "Module $1 created with success!"

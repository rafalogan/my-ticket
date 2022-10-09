#!/usr/bin/env zsh

ROOT_DIR="./src/modules"
CONTROLLER_TEMPLATE="import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { Controller } from 'src/core/abstracts';
import { responseApi, responseApiError, ResponseException, setReadOptions } from 'src/utils';

export class $1Controller extends Controller {
	constructor(private $1Service: ) {
		super();
	}
	save(req: Request, res: Response) {}

  edit(req: Request, res: Response) {}

  list(req: Request, res: Response) {}

  remove(req: Request, res: Response) {}
}"


ROUTES_TEMPLATE="import { Routes } from 'src/core/abstracts';
import { RouteOptions } from 'src/repositories/types';
import { methodNotAllowed } from 'src/core/routes/notfound.route';

export class $1Route extends Routes {
constructor(options: RouteOptions, private $1Controller:) {
	super(options.app, options.auth);
}

exec() {}
}"


MODULE_TEMPLATE="import { CommonModule } from 'src/core/abstracts';
import { ModuleOptions } from 'src/repositories/types';

export class $1Module extends CommonModule {
private readonly $1Controller: ;
private $1Route: ;

constructor(options: ModuleOptions<>) {
	super();

  this.$1Controller =
  this.$1Route =
}

exec = () => this.$1Route.exec();
}"

INDEX_TEMPLATE="export * from './$1.controller';
export * from './$1.route';
export * from './$1.module';"


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

echo "$CONTROLLER_TEMPLATE" >> "$ROOT_DIR/$1/$1.controller.ts" &&
echo "$ROUTES_TEMPLATE" >> "$ROOT_DIR/$1/$1.route.ts" &&
echo "$MODULE_TEMPLATE" >> "$ROOT_DIR/$1/$1.module.ts" &&
echo "$INDEX_TEMPLATE" >> "$ROOT_DIR/$1/index.ts" &&


echo "Module $1 created with success!"

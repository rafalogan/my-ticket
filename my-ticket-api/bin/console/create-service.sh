DEFAULT_DIR_NAME="./src/services"

if [ ! -d "$DEFAULT_DIR_NAME" ]; then
	mkdir -p "$DEFAULT_DIR_NAME" &&
	touch "$DEFAULT_DIR_NAME/index.ts"
fi

if [ ! -f "$DEFAULT_DIR_NAME/index.ts" ]; then
    touch "$DEFAULT_DIR_NAME/index.ts"
fi

touch "$DEFAULT_DIR_NAME/$1.service.ts" &&

echo "export * from './$1.service';" >> "$DEFAULT_DIR_NAME/index.ts" &&
echo "export class $1Service {}" >> "$DEFAULT_DIR_NAME/$1.service.ts" &&
echo "Config file $1.service.ts is created with success"

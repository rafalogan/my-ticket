DEFAULT_DIR_NAME="./src/config"

if [ ! -d "$DEFAULT_DIR_NAME" ]; then
	mkdir -p "$DEFAULT_DIR_NAME" &&
	touch "$DEFAULT_DIR_NAME/index.ts"
fi

if [ ! -f "$DEFAULT_DIR_NAME/index.ts" ]; then
    touch "$DEFAULT_DIR_NAME/index.ts"
fi

touch "$DEFAULT_DIR_NAME/$1.config.ts" &&

echo "export * from './$1.config';" >> "$DEFAULT_DIR_NAME/index.ts" &&
echo "export class $1 {}" >> "$DEFAULT_DIR_NAME/$1.config.ts" &&
echo "Config file $1.config.ts is created with success"

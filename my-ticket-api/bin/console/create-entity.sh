
DEFAULT_DIR_NAME="./src/repositories"
ENTITIES_DIR="$DEFAULT_DIR_NAME/entities"
TYPES_DIR="$DEFAULT_DIR_NAME/types"


if [ ! -d "$DEFAULT_DIR_NAME" ]; then
	mkdir -p "$DEFAULT_DIR_NAME" "$TYPES_DIR"
fi

if [ ! -d  "$ENTITIES_DIR" ]; then
	mkdir -p "$ENTITIES_DIR" &&
	touch "$ENTITIES_DIR/index.ts"
fi

if [ ! -d "$TYPES_DIR" ]; then
	mkdir -p "$TYPES_DIR" &&
	touch "$TYPES_DIR/index.ts"
fi

if [ ! -f "$ENTITIES_DIR/index.ts" ]; then
    touch "$ENTITIES_DIR/index.ts"
fi

if [ ! -f "$TYPES_DIR/index.ts" ]; then
    touch "$TYPES_DIR/index.ts"
fi

touch "$ENTITIES_DIR/$1.entity.ts" "$ENTITIES_DIR/$1.entity.spec.ts" "$TYPES_DIR/$1.ts" &&

echo "export * from './$1.entity';" >> "$ENTITIES_DIR/index.ts" &&
echo "export * from './$1';" >> "$TYPES_DIR/index.ts" &&
echo "Entity file $1 is created"



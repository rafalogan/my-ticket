
DEFAULT_DIR_NAME="./src/repositories"
TYPES_DIR="$DEFAULT_DIR_NAME/types"


if [ ! -d "$TYPES_DIR" ]; then
	mkdir -p "$TYPES_DIR" &&
	touch "$TYPES_DIR/index.ts"
fi

if [ ! -f "$TYPES_DIR/index.ts" ]; then
    touch "$TYPES_DIR/index.ts"
fi

touch  "$TYPES_DIR/$1.ts" &&

echo "export interface I$1 {}" >> "$TYPES_DIR/$1.ts" &&
echo "export * from './$1';" >> "$TYPES_DIR/index.ts" &&
echo "Type file $1 is created"




DEFAULT_DIR_NAME="./src/repositories"
TYPES_DIR="$DEFAULT_DIR_NAME/models"


if [ ! -d "$TYPES_DIR" ]; then
	mkdir -p "$TYPES_DIR" &&
	touch "$TYPES_DIR/index.ts"
fi

if [ ! -f "$TYPES_DIR/index.ts" ]; then
    touch "$TYPES_DIR/index.ts"
fi

touch  "$TYPES_DIR/$1.model.ts" &&

echo "export class $1Model {}" >> "$TYPES_DIR/$1.model.ts" &&
echo "export * from './$1.model';" >> "$TYPES_DIR/index.ts" &&
echo "Model file $1.model.ts is created"



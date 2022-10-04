export abstract class Controller {
	abstract save?(): void;
	abstract edit?(): void;
	abstract list?(): void;
	abstract remove?(): void;
}

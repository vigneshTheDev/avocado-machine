export class LFU<T> {
	private length = 0;
	constructor(private capacity: number) {
	}

  get size() {
    return this.length
  }

	get(key: string): T | null {
	}

	put(key: string, value: T) {
	}
}

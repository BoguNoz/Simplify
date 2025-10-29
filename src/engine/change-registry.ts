import {runInAction} from "mobx";

export class ChangeRegistry {
    private queue: (() => void | Promise<void>)[] = [];
    private timer: any = null;
    private readonly delay: number;

    constructor(delay = 100) {
        this.delay = delay;
    }

    // #region Public
    forceFlush= async (): Promise<void> => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        await this.flush()
    }

    registerChange = (fn: () => void | Promise<void>): void => {
        this.queue.push(fn);
        this.scheduleFlush();
    }
    // #endregion Public


    // #region Private
    private scheduleFlush = (): void => {
        if (this.timer) {
            return;
        }
        this.timer = setTimeout(() => this.flush(), this.delay);
    }

    private onFlush = async (calls: (() => void | Promise<void>)[]): Promise<void> => {
        runInAction(() => {
            for (const fn of calls) {
                fn()
            }
        })
    }

    private flush = async (): Promise<void> => {
        if (!this.queue.length) {
            return;
        }

        const calls = [...this.queue];
        this.queue = []

        clearTimeout(this.timer);
        this.timer = null;

        await this.onFlush(calls);
    }
    // #endregion Private
}
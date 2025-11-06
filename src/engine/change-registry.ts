import {runInAction} from "mobx";

/**
 * A registry for batching reactive changes in a controlled, debounced manner.
 *
 * @remarks
 * The `ChangeRegistry` collects functions (typically MobX state modifications)
 * and executes them together in a single `runInAction` block after a small delay.
 * This helps prevent unnecessary recomputations and improves performance in highly reactive contexts.
 */
export class ChangeRegistry {
    private queue: (() => void | Promise<void>)[] = [];
    private timer: any = null;

    /** Delay (in milliseconds) before flushing queued changes. */
    private readonly delay: number;

    constructor(delay = 100) {
        this.delay = delay;
    }

    // #region Public
    /**
     * Forces immediate execution of all pending queued changes.
     *
     * @remarks
     * - This cancels any scheduled automatic flush and runs all queued
     * changes immediately inside a single `MobX.runInAction` call.
     */
    forceFlush= async (): Promise<void> => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        await this.flush()
    }

    /**
     * Registers a reactive change callback to be executed in the next flush cycle.
     *
     * @param fn - A function (sync or async) that performs a state change.
     * @remarks
     * - Each registered change is queued and executed later in a single `runInAction` block,
     * ensuring all changes are batched together for optimal performance.
     *
     * @example
     * ```ts
     * registry.registerChange(() => {
     *   formStore.fields["username"].value = "Alice";
     * });
     * ```
     */
    registerChange = (fn: () => void | Promise<void>): void => {
        this.queue.push(fn);
        this.scheduleFlush();
    }
    // #endregion Public


    // #region Private
    /** Schedules the next flush operation if not already pending. */ 
    private scheduleFlush = (): void => {
        if (this.timer) {
            return;
        }
        this.timer = setTimeout(() => this.flush(), this.delay);
    }

    /** Executes a batch of queued functions inside a single MobX action. */
    private onFlush = async (calls: (() => void | Promise<void>)[]): Promise<void> => {
        runInAction(() => {
            for (const fn of calls) {
                fn()
            }
        })
    }

    /** Fulushes the queue of registerded changes. */
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
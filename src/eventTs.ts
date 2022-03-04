interface eventItem {
    fn: Function,
    isOnce: boolean
}

interface event {
    [key: string]: eventItem[]
}

class MyEventEmitter {
    event: event | null
    constructor() {
        this.event = Object.create(null)
    }

    on(name: string, fn: Function, isOnce: boolean = false): void {
        if (!this.event[name]) {
            this.event[name] = []
        }
        this.event[name].push({ fn, isOnce })
    }

    emit(name: string, args: any[]): void {
        for (let i = 0; i < this.event[name].length; i++) {
            let { fn, isOnce } = this.event[name][i]
            if (fn) fn.call(this, args)
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listener = ((...payload: any[]) => void) & { isOnce?: boolean}

interface ListenersMap {
  [propName: string]: Listener[]
}

export default class ZnuEvent {
  private _listenersMap: ListenersMap

  constructor() {
    this._listenersMap = {}
  }

  /**
   * 绑定事件
   * @param {String|Symbol} eventName 事件名
   * @param {Function} listener 回调函数
   */
  on(eventName: string, listener: Listener): ZnuEvent {
    if (undefined === this._listenersMap[eventName]) {
      this._listenersMap[eventName] = []
    }
    this._listenersMap[eventName].push(listener)
    return this
  }

  /**
   * 添加单次监听器 listener 到名为 eventName 的事件
   * 当 eventName 事件下次触发是，监听器会先被删除，然后在调用
   * @param {String|Symbol} eventName 事件名
   * @param {Function} listener 回调函数
   */
  once(eventName: string, listener: Listener): ZnuEvent {
    listener.isOnce = true
    this.on(eventName, listener)
    return this
  }

  /**
   * 解除绑定
   * 如果不指定listener，则解除所有eventName对应的回调
   * @param {String|Symbol} eventName 事件名
   * @param {Function} listener 回调函数
   */
  off(eventName: string, listener?: Listener): ZnuEvent {
    const listeners = this._listenersMap[eventName]
    // 事件存在
    if (undefined !== listeners) {
      // 清空事件名对应的所有回调
      if (undefined === listener) {
        delete this._listenersMap[eventName]
      } else { // 清空指定回调
        const index = listeners.findIndex((fn: Listener) => fn === listener)
        listeners.splice(index, 1)
      }
    }
    return this
  }

  /**
   * 解除所有绑定
   */
  offAll(): void {
    this._listenersMap = {}
  }

  /**
   * 按照监听器注册顺序，同步调用每个注册到 eventName 的事件的监听器，并传入参数。
   * @param {String|Symbol} eventName 事件名
   * @param {Any} payload 载荷数据
   * @return {Boolean} 如果事件有监听器，则返回true，否则返回false
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(eventName: string, ...payload: any[]): boolean {
    const listeners = this._listenersMap[eventName]
    if (undefined !== listeners && listeners.length > 0) {
      for (const [index, listener] of listeners.entries()) {
        if (listener.isOnce) {
          const listenerClone = listener
          listeners.splice(index, 1)
          listenerClone(...payload)
        } else {
          listener(...payload)
        }
      }
      return true
    } else {
      return false
    }
  }

  /**
   * 检测是否已绑定事件
   * @param {String|Symbol} eventName 事件名
   * @return {Boolean}  是否已绑定
   */
  has(eventName: string): boolean {
    return undefined !== this._listenersMap[eventName] && this._listenersMap[eventName].length > 0
  }

  /**
   * 返回所有事件名称
   * @return {Boolean} 事件名称
   */
  eventNames(): string[] {
    const eventNames: string[] = []
    for (const eventName in this._listenersMap) {
      eventNames.push(eventName)
    }
    return eventNames
  }

  /**
   * 销毁实例
   */
  destroy(): void{
    this.offAll()
  }
}

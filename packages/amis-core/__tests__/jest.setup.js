const originalWarn = console.warn.bind(console.warn);
const originalGroupCollapsed = console.warn.bind(console.groupCollapsed);
const originalGroup = console.warn.bind(console.group);
const originalGroupEnd = console.warn.bind(console.groupEnd);
const originalDebug = console.warn.bind(console.debug);
const originalError = console.error.bind(console.error);
require('@testing-library/jest-dom');
require('moment-timezone');
const loadAllAsyncRenderers = require('amis-core').loadAllAsyncRenderers;
const moment = require('moment');
moment.tz.setDefault('Asia/Shanghai');
const cleanup = require('@testing-library/react').cleanup;

// https://github.com/nrwl/nx/issues/1178
// 解决jest 运行的时候报：
// ReferenceError: DragEvent is not defined
if (!window.DragEvent) {
  Object.defineProperty(window, 'DragEvent', {
    value: class DragEvent {}
  });
}

// Mock ResizeObserver in jest env
global.ResizeObserver = require('resize-observer-polyfill');

global.__buildVersion = '';

global.beforeAll(async () => {
  console.warn =
    console.groupCollapsed =
    console.group =
    console.groupEnd =
    console.debug =
    console.error =
      msg => {
        // warning 先关了，实在太吵。
        // const str = msg.toString();
        // if (
        //   str.includes('componentWillMount') ||
        //   str.includes('componentWillReceiveProps')
        // ) {
        //   return;
        // }
        // originalWarn(msg);
      };

  await loadAllAsyncRenderers();
});
global.afterAll(() => {
  console.warn = originalWarn;
  console.groupCollapsed = originalGroupCollapsed;
  console.group = originalGroup;
  console.groupEnd = originalGroupEnd;
  console.debug = originalDebug;
  console.error = originalError;
  cleanup();
});

// expect.addSnapshotSerializer({
//   test: val => typeof val === 'string' && /^[a-z0-9]{12}$/.test(val),
//   print: val => {
//     return JSON.stringify('__guid_dynamic_value__');
//   }
// });

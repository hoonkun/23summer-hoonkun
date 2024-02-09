import { definePropertyIfNotExists } from "./_base";

definePropertyIfNotExists(String.prototype, "let", {
  value: function <R>(block: (it: any) => R): R { return block(this) },
  writable: true, configurable: true, enumerable: false
});

definePropertyIfNotExists(String.prototype, "also", {
  value: function(block: (it: any) => unknown) { block(this); return this; },
  writable: true, configurable: true, enumerable: false
})

definePropertyIfNotExists(String.prototype, "takeIf", {
  value: function(block: (it: any) => boolean) { return block(this) ? this : null; },
  writable: true, configurable: true, enumerable: false
})

definePropertyIfNotExists(String.prototype, "takeUnless", {
  value: function(block: (it: any) => boolean) { return block(this) ? null : this; },
  writable: true, configurable: true, enumerable: false
})

export {}

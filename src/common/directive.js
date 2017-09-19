import Vue from 'vue'

Vue.directive('select2', {
  inserted: function (el, binding, vnode) {
   let options = binding.value || {};

  $(el).select2(options).on("select2:select", (e) => {
    el.dispatchEvent(new Event('change', { target: e.target }));
  });
  },
  update: function(el, binding, vnode) {
    $(el).trigger("change");
  }
});

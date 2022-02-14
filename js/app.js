(() => {
  "use strict";
  function t(t) {
    this.type = t;
  }
  (t.prototype.init = function () {
    const t = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let t = 0; t < this.nodes.length; t++) {
      const e = this.nodes[t],
        n = e.dataset.da.trim().split(","),
        i = {};
      (i.element = e),
        (i.parent = e.parentNode),
        (i.destination = document.querySelector(n[0].trim())),
        (i.breakpoint = n[1] ? n[1].trim() : "767"),
        (i.place = n[2] ? n[2].trim() : "last"),
        (i.index = this.indexInParent(i.parent, i.element)),
        this.оbjects.push(i);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (t) {
          return (
            "(" + this.type + "-width: " + t.breakpoint + "px)," + t.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (t, e, n) {
          return Array.prototype.indexOf.call(n, t) === e;
        }
      ));
    for (let e = 0; e < this.mediaQueries.length; e++) {
      const n = this.mediaQueries[e],
        i = String.prototype.split.call(n, ","),
        o = window.matchMedia(i[0]),
        r = i[1],
        a = Array.prototype.filter.call(this.оbjects, function (t) {
          return t.breakpoint === r;
        });
      o.addListener(function () {
        t.mediaHandler(o, a);
      }),
        this.mediaHandler(o, a);
    }
  }),
    (t.prototype.mediaHandler = function (t, e) {
      if (t.matches)
        for (let t = 0; t < e.length; t++) {
          const n = e[t];
          (n.index = this.indexInParent(n.parent, n.element)),
            this.moveTo(n.place, n.element, n.destination);
        }
      else
        for (let t = e.length - 1; t >= 0; t--) {
          const n = e[t];
          n.element.classList.contains(this.daClassname) &&
            this.moveBack(n.parent, n.element, n.index);
        }
    }),
    (t.prototype.moveTo = function (t, e, n) {
      e.classList.add(this.daClassname),
        "last" === t || t >= n.children.length
          ? n.insertAdjacentElement("beforeend", e)
          : "first" !== t
          ? n.children[t].insertAdjacentElement("beforebegin", e)
          : n.insertAdjacentElement("afterbegin", e);
    }),
    (t.prototype.moveBack = function (t, e, n) {
      e.classList.remove(this.daClassname),
        void 0 !== t.children[n]
          ? t.children[n].insertAdjacentElement("beforebegin", e)
          : t.insertAdjacentElement("beforeend", e);
    }),
    (t.prototype.indexInParent = function (t, e) {
      const n = Array.prototype.slice.call(t.children);
      return Array.prototype.indexOf.call(n, e);
    }),
    (t.prototype.arraySort = function (t) {
      "min" === this.type
        ? Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? -1
                : "last" === t.place || "first" === e.place
                ? 1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          })
        : Array.prototype.sort.call(t, function (t, e) {
            return t.breakpoint === e.breakpoint
              ? t.place === e.place
                ? 0
                : "first" === t.place || "last" === e.place
                ? 1
                : "last" === t.place || "first" === e.place
                ? -1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          });
    });
  new t("max").init();
  class e {
    constructor(t, e = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, t)),
        this.config.init)
      ) {
        const t = document.querySelectorAll("[data-prlx-mouse]");
        t.length && !n.any()
          ? (this.paralaxMouseInit(t),
            this.setLogging(`Проснулся, слежу за объектами: (${t.length})`))
          : this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
      }
    }
    paralaxMouseInit(t) {
      t.forEach((t) => {
        const e = t.closest("[data-prlx-mouse-wrapper]"),
          n = t.dataset.prlxCx ? +t.dataset.prlxCx : 100,
          i = t.dataset.prlxCy ? +t.dataset.prlxCy : 100,
          o = t.hasAttribute("data-prlx-dxr") ? -1 : 1,
          r = t.hasAttribute("data-prlx-dyr") ? -1 : 1,
          a = t.dataset.prlxA ? +t.dataset.prlxA : 50;
        let s = 0,
          l = 0,
          c = 0,
          d = 0;
        function u(e = window) {
          e.addEventListener("mousemove", function (e) {
            const n = t.getBoundingClientRect().top + window.scrollY;
            if (n >= window.scrollY || n + t.offsetHeight >= window.scrollY) {
              const t = window.innerWidth,
                n = window.innerHeight,
                i = e.clientX - t / 2,
                o = e.clientY - n / 2;
              (c = (i / t) * 100), (d = (o / n) * 100);
            }
          });
        }
        !(function e() {
          (s += ((c - s) * a) / 1e3),
            (l += ((d - l) * a) / 1e3),
            (t.style.cssText = `transform: translate3D(${(o * s) / (n / 10)}%,${
              (r * l) / (i / 10)
            }%,0);`),
            requestAnimationFrame(e);
        })(),
          e ? u(e) : u();
      });
    }
    setLogging(t) {
      this.config.logging &&
        (function (t) {
          setTimeout(() => {
            window.FLS && console.log(t);
          }, 0);
        })(`[PRLX Mouse]: ${t}`);
    }
  }
  let n = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        n.Android() || n.BlackBerry() || n.iOS() || n.Opera() || n.Windows()
      );
    },
  };
  let i = !0,
    o = (t = 500) => {
      let e = document.querySelector("body");
      if (i) {
        let n = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < n.length; t++) {
            n[t].style.paddingRight = "0px";
          }
          (e.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, t);
      }
    },
    r = (t = 500) => {
      let e = document.querySelector("body");
      if (i) {
        let n = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < n.length; t++) {
          n[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (e.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, t);
      }
    };
  let a = !1;
  setTimeout(() => {
    if (a) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    n.any() && document.documentElement.classList.add("touch"),
    window.addEventListener("load", function () {
      setTimeout(function () {
        document.documentElement.classList.add("loaded");
      }, 0);
    }),
    (function () {
      let t = document.querySelector(".icon-menu");
      t &&
        t.addEventListener("click", function (t) {
          i &&
            (((t = 500) => {
              document.documentElement.classList.contains("lock") ? o(t) : r(t);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    new e({});
})();

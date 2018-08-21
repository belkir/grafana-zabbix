'use strict';

System.register(['angular', 'lodash'], function (_export, _context) {
  "use strict";

  var angular, _, _createClass, template, GroupSelectorCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      template = '\n<value-select-dropdown variable="ctrl.gOptions" on-updated="ctrl.onChange(ctrl.gOptions)">\n</value-select-dropdown>\n';


      angular.module('grafana.directives').directive('groupSelector', function () {
        return {
          scope: {
            groups: "=",
            options: "=",
            onChange: "&"
          },
          controller: GroupSelectorCtrl,
          controllerAs: 'ctrl',
          template: template
        };
      });

      GroupSelectorCtrl = function () {

        /** @ngInject */
        function GroupSelectorCtrl($scope) {
          _classCallCheck(this, GroupSelectorCtrl);

          this.scope = $scope;
          var groups = $scope.groups;
          var options = $scope.options;
          this.gOptions = {
            multi: true,
            current: { value: groups, text: groups.join(" + ") },
            options: _.map(options, function (g) {
              return { text: g, value: g, selected: _.includes(groups, g) };
            })
          };
        }

        _createClass(GroupSelectorCtrl, [{
          key: 'onChange',
          value: function onChange(updatedOptions) {
            var _this = this;

            var newGroups = updatedOptions.current.value;
            this.scope.groups = newGroups;

            // Run after model was changed
            this.scope.$$postDigest(function () {
              _this.scope.onChange();
            });
          }
        }]);

        return GroupSelectorCtrl;
      }();
    }
  };
});
//# sourceMappingURL=group-selector.directive.js.map

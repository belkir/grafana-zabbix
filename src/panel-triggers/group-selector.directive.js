import angular from 'angular';
import _ from 'lodash';

const template = `
<value-select-dropdown variable="ctrl.gOptions" on-updated="ctrl.onChange(ctrl.gOptions)">
</value-select-dropdown>
`;

angular
.module('grafana.directives')
.directive('groupSelector', () => {
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

class GroupSelectorCtrl {

  /** @ngInject */
  constructor($scope) {
    this.scope = $scope;
    let groups = $scope.groups;
    let options = $scope.options;
    this.gOptions = {
      multi: true,
      current: {value: groups, text: groups.join(" + ")},
      options: _.map(options, (g) => {
        return {text: g, value: g, selected: _.includes(groups, g)};
      })
    };
  }

  onChange(updatedOptions) {
    let newGroups = updatedOptions.current.value;
    this.scope.groups = newGroups;

    // Run after model was changed
    this.scope.$$postDigest(() => {
      this.scope.onChange();
    });
  }
}

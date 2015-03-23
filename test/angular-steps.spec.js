describe('AngularSteps', function () {
    var $compile, $rootScope, scope, view, StepsService;

    beforeEach(module('angular-steps'));
    beforeEach(inject(function (_$compile_, _$rootScope_, _StepsService_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        StepsService = _StepsService_;
        scope = $rootScope.$new();
        view = createView(scope);
        scope.finishedSteps = function () {};
    }));

    function createView(scope) {
        scope.referenceCurrentStep = null;
        var element = angular.element('<steps on-finish="finishedSteps()" current-step="referenceCurrentStep" ng-init="msg = 14" >'
                + '    <step name="Starting">'
                + '        <h1>This is the first step</h1>'
                + '        <p>Here you can use whatever you want. You can use other directives, binding, etc.</p>'
                + '        <input type="submit" step-next value="Continue" />'
                + '    </step>'
                + '    <step name="Continuing">'
                + '        <h1>Continuing</h1>'
                + '        <p>You have continued here!</p>'
                + '        <input type="submit" step-next value="Go on" />'
                + '    </step>'
                + '    <step name="More steps">'
                + '        <p>Even more steps!!</p>'
                + '        <input type="submit" step-next value="Finish now" />'
                + '    </step>'
                + '</steps>');
        var elementCompiled = $compile(element)(scope);
        $rootScope.$digest();
        return elementCompiled;
    }

    it('should correctly create the steps', function () {
        expect(StepsService).toBeTruthy();
        expect(view.find('div').length).toEqual(4);
        // expect the currect step to be desirable one
        expect(scope.referenceCurrentStep).toEqual('Starting');
    });

    it('should go to the next step', function () {
        expect(scope.referenceCurrentStep).toEqual('Starting');
        StepsService.steps().next();
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('Continuing');
    });

    it('should finish if going past last', function () {
        spyOn(scope, 'finishedSteps');
        StepsService.steps().goTo(2);
        StepsService.steps().next();
        $rootScope.$digest();
        expect(scope.finishedSteps).toHaveBeenCalled();
    });

    it('should return to a previous step', function () {
        expect(scope.referenceCurrentStep).toEqual('Starting');
        StepsService.steps().next();
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('Continuing');
        StepsService.steps().previous();
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('Starting');
    });

    it('should throw error trying to go past first', function () {
        expect(function () { StepsService.steps().previous(); }).toThrow();
    });

    it('should go to a step specified by name', function () {
        expect(scope.referenceCurrentStep).toEqual('Starting');
        StepsService.steps().goTo('More steps');
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('More steps');
    });

    it('should go to a step specified by index', function () {
        expect(scope.referenceCurrentStep).toEqual('Starting');
        StepsService.steps().goTo(2);
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('More steps');
    });

    it('should finish', function () {
        spyOn(scope, 'finishedSteps');
        expect(scope.referenceCurrentStep).toEqual('Starting');
        StepsService.steps().finish();
        expect(scope.finishedSteps).toHaveBeenCalled();
    });

    it('should cancel', function () {
        StepsService.steps().goTo(2);
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('More steps');
        StepsService.steps().cancel();
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('Starting');
    });

    it('should cleanup on $destroy', function () {
        scope.$destroy();
        expect(StepsService.steps()).toBeUndefined();
    });

    it('should change step if currentStep var changes', function () {
        spyOn(scope, 'finishedSteps');
        scope.referenceCurrentStep = 'More steps';
        $rootScope.$digest();
        StepsService.steps().next();
        expect(scope.finishedSteps).toHaveBeenCalled();
    });

    it('should change step on click', function () {
        var btn = view.find('input')[0];
        var event = document.createEvent('MouseEvent');
        event.initMouseEvent('click', true, true);
        btn.dispatchEvent(event);
        expect(scope.referenceCurrentStep).toEqual('Continuing');
    });
});

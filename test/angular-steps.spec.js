describe('AngularSteps', function () {
    var $compile, $rootScope, StepsService;

    beforeEach(module('angular-steps'));
    beforeEach(inject(function (_$compile_, _$rootScope_, _StepsService_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        StepsService = _StepsService_;
    }));

    /**
     * Create the view with wizard to test
     * @param  {Scope} scope         A scope to bind to
     * @return {[DOM element]}       A DOM element compiled
     */
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
        var scope = $rootScope.$new();
        var view = createView(scope);
        expect(StepsService).toBeTruthy();
        expect(view.find('div').length).toEqual(4);
        // expect the currect step to be desirable one
        expect(scope.referenceCurrentStep).toEqual('Starting');
    });

    it('should go to the next step', function () {
        var scope = $rootScope.$new();
        var view = createView(scope);
        expect(scope.referenceCurrentStep).toEqual('Starting');
        StepsService.steps().next();
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('Continuing');
    });

    it('should return to a previous step', function () {
        var scope = $rootScope.$new();
        var view = createView(scope);
        expect(scope.referenceCurrentStep).toEqual('Starting');
        StepsService.steps().next();
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('Continuing');
        StepsService.steps().previous();
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('Starting');
    });

    it('should go to a step specified by name', function () {
        var scope = $rootScope.$new();
        var view = createView(scope);
        expect(scope.referenceCurrentStep).toEqual('Starting');
        StepsService.steps().goTo('More steps');
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('More steps');
    });

    it('should go to a step specified by index', function () {
        var scope = $rootScope.$new();
        var view = createView(scope);
        expect(scope.referenceCurrentStep).toEqual('Starting');
        StepsService.steps().goTo(2);
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('More steps');
    });

    it('should finish', function () {
        var scope = $rootScope.$new();
        var flag = false;
        scope.finishedSteps = function () { flag = true; };
        var view = createView(scope);
        expect(scope.referenceCurrentStep).toEqual('Starting');
        StepsService.steps().finish();
        expect(flag).toBeTruthy();
        $rootScope.$digest();
    });

    it('should cancel', function () {
        var scope = $rootScope.$new();
        var view = createView(scope);
        StepsService.steps().goTo(2);
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('More steps');
        StepsService.steps().cancel();
        $rootScope.$digest();
        expect(scope.referenceCurrentStep).toEqual('Starting');
    });
});

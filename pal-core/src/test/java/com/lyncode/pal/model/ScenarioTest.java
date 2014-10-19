package com.lyncode.pal.model;

import com.lyncode.pal.PalTest;
import com.lyncode.pal.support.MockedScenarioBuilder;
import com.lyncode.pal.syntax.flow.Communication;
import com.lyncode.pal.syntax.flow.CommunicationBuilder;
import com.lyncode.pal.syntax.flow.CommunicationStore;
import org.junit.Test;

import static com.lyncode.pal.model.Status.Failed;
import static com.lyncode.pal.model.Status.Passed;
import static com.lyncode.pal.support.MockedScenarioBuilder.scenario;
import static com.lyncode.pal.syntax.SyntacticSugar.*;
import static org.hamcrest.core.Is.is;

public class ScenarioTest extends PalTest {

    @Test
    public void scenarioMarkedAsFailedIsGreaterThanScenarioMarkedAsPassed() throws Exception {
        given(scenario("1").markedAs(Failed));
        and(given(scenario("2").markedAs(Passed)));

        when(comparing("1", to("2")));

        then(theResult(), is(1));
    }

    @Test
    public void helloWorld() throws Exception {

    }


    private int result;

    private int theResult() {
        return result;
    }

    private CommunicationBuilder comparing(final String scenario1, final String scenario2) {
        return new CommunicationBuilder() {
            @Override
            public CommunicationStore apply(CommunicationStore input) {
                Scenario first = givens().get(MockedScenarioBuilder.scenarioName(scenario1), Scenario.class);
                Scenario second = givens().get(MockedScenarioBuilder.scenarioName(scenario2), Scenario.class);
                result = first.compareTo(second);
                input.with(new Communication("1", "2", "Hello"));
                return input;
            }
        };
    }

}
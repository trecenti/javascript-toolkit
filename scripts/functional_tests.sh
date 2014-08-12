#!/bin/sh
java -jar node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.40.0.jar &
sleep 10 && node bin/nightwatch --group tests --env ${TEST_ENV-default}
kill %1

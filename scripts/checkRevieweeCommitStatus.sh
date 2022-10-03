#!/bin/bash
# used env variables:
CHECK_PENDING_COMMITS=true
REVIEWEE_URL=https://api.reviewee.it
COMMITS_STATS_ENDPOINT=repository/Kottenance/commitStats
ALLOWED_NUMBER_OF_PENDING_COMMITS=5
if [ $CHECK_PENDING_COMMITS != true ]; then
    echo "Checking pending commits turned off"
    exit 0
fi
REVIEWEE_RESPONSE=`wget ${REVIEWEE_URL}/${COMMITS_STATS_ENDPOINT} -q -O -`
PENDING_COMMITS=`echo "$REVIEWEE_RESPONSE" | sed 's/.*"pendingCommitsCount":[[:space:]]*\([0-9]*\).*/\1/'`
REJECTED_COMMITS=`echo "$REVIEWEE_RESPONSE" | sed 's/.*"rejectedCommitsCount":[[:space:]]*\([0-9]*\).*/\1/'`
SYSTEM_REJECTED_COMMITS=`echo "$REVIEWEE_RESPONSE" | sed 's/.*"systemRejectedCommitsCount":[[:space:]]*\([0-9]*\).*/\1/'`
echo "Pending commits: $PENDING_COMMITS"
echo "Rejected commits: $REJECTED_COMMITS"
echo "System rejected commits: $SYSTEM_REJECTED_COMMITS"
if [ "$PENDING_COMMITS" -gt "$ALLOWED_NUMBER_OF_PENDING_COMMITS" ]; then
    echo "ERROR: More than $ALLOWED_NUMBER_OF_PENDING_COMMITS pending commits - please review before doing deploy!"
    exit 1
fi
if [ "$REJECTED_COMMITS" -gt "0" ]; then
    echo "ERROR: There are some rejected commits - please fix them before doing deploy!"
    exit 1
fi
if [ "$SYSTEM_REJECTED_COMMITS" -gt "0" ]; then
    echo "ERROR: There are some system rejected commits - please review before doing deploy!"
    exit 1
fi
exit 0

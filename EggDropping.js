

function eggDrop(eggs, floors) {
    const dp = Array.from({ length: eggs + 1 }, () =>
        Array(floors + 1).fill(0)
    );

    for (let j = 1; j <= floors; j++) {
        dp[1][j] = j;
    }

    for (let i = 1; i <= eggs; i++) {
        dp[i][1] = 1;
        dp[i][0] = 0;
    }

    for (let i = 2; i <= eggs; i++) {
        for (let j = 2; j <= floors; j++) {
            let low = 1, high = j;
            dp[i][j] = Infinity;

            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                const breaks = dp[i - 1][mid - 1];
                const noBreaks = dp[i][j - mid];

                const worstCaseDrops = 1 + Math.max(breaks, noBreaks);

                // Adjust the binary search range based on the results
                if (breaks > noBreaks) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }

                dp[i][j] = Math.min(dp[i][j], worstCaseDrops);
            }
        }
    }

    return dp[eggs][floors];
}

// Test case
console.log(eggDrop(2, 100)); // Efficient for large inputs

// Optimized Code:


function eggDrop(eggs, floors) {
    let drops = 0;

    // dp[drops][eggs] = maximum floors we can cover
    const dp = Array.from({ length: floors + 1 }, () => Array(eggs + 1).fill(0));

    while (dp[drops][eggs] < floors) {
        drops++;
        for (let i = 1; i <= eggs; i++) {
            dp[drops][i] = dp[drops - 1][i - 1] + dp[drops - 1][i] + 1;
        }
    }

    return drops;
}

// Test case
console.log(eggDrop(2, 100)); // More efficient, covers more floors quickly


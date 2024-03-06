
/**
 * 
 * @param {import("@actions/core")} core 
 * @param {import("@actions/github").context} context
 * @param {ReturnType<typeof import("@actions/github").getOctokit>} octokit 
 * @param {String} message 
 */

export async function run(core, octokit, context, message) {
  core.info(`==> Auto Approving #${context.payload.pull_request.number}`)
  try {
    await octokit.rest.pulls.createReview({
      ...context.repo,
      pull_number: context.payload.pull_request.number,
      event: "APPROVE",
    })

    await octokit.rest.pulls.createReview({
      ...context.repo,
      pull_number: context.payload.pull_request.number,
      event: 'COMMENT',
      body: message
    })
  } catch (e) {
    core.setFailed(`==> ${e.message}`)
  }
}

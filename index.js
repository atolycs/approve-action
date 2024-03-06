// Loader

import core from "@actions/core"
import { getOctokit, Context } from "@actions/github"
import { run } from "./src/main"

const token = core.getInput("token", {required:true})
const octokit = getOctokit(token)
const message = core.getInput("message")

const context = Context

try {
  run(core, octokit, context, message)
} catch (e) {
  core.setFailed(`==> ${e.message}`)
}
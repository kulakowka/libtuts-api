'use strict'

const async = require('async')
const debug = require('debug')('app:jobs')
const models = require('require-dir')('../../models', {recurse: true})

module.exports = function updateProjectCounters (date) {
  return () => models.tutorial.find({updatedAt: {$gte: date}}).sort('-updatedAt').then(updateTutorialProjects)
}

function updateTutorialProjects (tutorials) {
  let projects = new Set()

  tutorials.forEach(tutorial => {
    tutorial.projects.forEach(project => projects.add(project))
  })

  let projectsNames = Array.from(projects)
  models.project.find({slug: {$in: projectsNames}}).then(updateProjects)
}

function updateProjects (projects) {
  debug('Update tutorialsCount for %d projects ', updateProjects.length)
  async.map(projects, updateProject, (err, results) => {
    if (err) return debug(err.message)
    debug('All projects counters updated')
  })
}

function updateProject (project, callback) {
  async.parallel({
    tutorialsCount: getTutorialsCount(project)
  }, (err, result) => {
    if (err) return callback(err)
    Object.assign(project, result)
    debug(`Project: ${project.slug} tutorialsCount = ${project.tutorialsCount}`)
    project.save(callback)
  })
}

function getTutorialsCount (project) {
  return (callback) => models.tutorial.count({projects: {$in: [project.slug]}}, callback)
}

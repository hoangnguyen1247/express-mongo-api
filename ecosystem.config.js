module.exports = {
    apps: [
        {
            name: "bookweb_notifier_dev",
            script: "npm run start:deploy",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            }
        },
        {
            name: "bookweb_notifier",
            script: "npm run start:prod",
            env: {
                NODE_ENV: "production",
            },
            env_production: {
                NODE_ENV: "production",
            }
        },
    ],
    deploy: {
        development: {
            "user":  "develop",
            "host" : "api.bookweb.io",
            "ref" : "origin/develop",
            "repo" : "git@bitbucket.org:bookweb/bookweb-notifier.git",
            "path" : "/usr/src/bookweb-dev/bookweb-notifier",
            "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --only bookweb_notifier_dev --env development",
            "env": {
                "NODE_ENV": "development",
            },
        },
        production: {
            "user":  "develop",
            "host" : "api.bookweb.io",
            "ref" : "origin/master",
            "repo" : "git@bitbucket.org:bookweb/bookweb-notifier.git",
            "path" : "/usr/src/bookweb/bookweb-notifier",
            "post-deploy" : "npm install && pm2 startOrRestart ecosystem.config.js --only bookweb_notifier --env production",
            "env": {
                "NODE_ENV": "production",
            },
        },
    },
}

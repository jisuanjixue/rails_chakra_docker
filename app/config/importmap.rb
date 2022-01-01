# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"

pin "react", to: "https://ga.jspm.io/npm:react@17.0.2/index.js", preload: true
pin "react-dom", to: "https://ga.jspm.io/npm:react-dom@17.0.2/index.js", preload: true
pin "object-assign", to: "https://ga.jspm.io/npm:object-assign@4.1.1/index.js"
pin "scheduler", to: "https://ga.jspm.io/npm:scheduler@0.20.2/index.js"


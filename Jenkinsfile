pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                 echo 'Build..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                catchError {
                    script {
                        sh "docker-compose up -d --build"
                    }
                }
            }
        }
    }
}
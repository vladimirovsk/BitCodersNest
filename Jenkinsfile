pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                 sh 'cp /opt/project/BitCodersNest/.env /var/lib/jenkins/workspace/BitCodersNest/.env'
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
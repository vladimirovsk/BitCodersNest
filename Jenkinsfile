pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'cp /opt/project/BitCodersNest/.env /var/lib/jenkins/workspace/BitCodersNest/.env'
                echo 'Building..'
                catchError {
                    script {
                        sh "docker build ."
                    }
                }

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
                        sh "docker-compose up -d"
                    }
                }
            }
        }
    }
}
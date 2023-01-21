pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'cp /opt/project/BitCodersNest/.env /var/lib/jenkins/workspace/BitCodersNest/.env'
                echo 'Building..'
                catchError {
                    script {
                        sh "docker stop -f mongo_bitcoders"
                        sh "docker stop -f mongo_bitcoders"

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
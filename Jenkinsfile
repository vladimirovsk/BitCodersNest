pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'cp /opt/project/BitCodersNest/.env /var/lib/jenkins/workspace/BitCodersNest/.env'
                echo 'Building..'
                catchError {
                    script {
                        echo 'Stop mongo..'
                        sh 'docker stop mongo_bitcoders'
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
                        sh "sudo chmod 755 -R /var/lib/jenkins/workspace/BitCodersNest/.docker"
                        sh "docker-compose up -d --build"
                    }
                }
            }
        }
    }
}
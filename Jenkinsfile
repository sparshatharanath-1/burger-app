pipeline {
    agent any

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/sparshatharanath-1/burger-app.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building Burger App..."
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying Website..."

                // Copy files to deployment folder
                sh '''
                mkdir -p /var/www/html/burger-app
                cp -r src/* /var/www/html/burger-app/
                '''
            }
        }
    }
}
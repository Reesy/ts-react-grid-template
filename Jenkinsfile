
pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
          nodejs('Node 16') {
            sh 'npm i'
          } 
      }
    }

    stage('Build') {
      steps {
        nodejs('Node 16') {
            sh 'npm run build'
        }
      }
    }

    
    stage('Test') {
      steps {
        nodejs('Node 16') {
          sh 'CI=true npm run test'
        }
      }
    }


    stage('Clean up') {
      steps {
        cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true)
      }
    }
  }
}
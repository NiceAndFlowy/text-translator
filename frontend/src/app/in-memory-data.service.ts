import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const translations = [
      {inputText: 'yo hablo espanol', language: 'spanish', translatedText: 'I speak spanish'},
      {inputText: 'I speak english', language: 'english', translatedText: 'I speak english'},
      {inputText: 'je parle', language: 'french', translatedText: 'I speak'},
    ];
    return {translations};
  }
}

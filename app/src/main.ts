import { hello } from './scripts/hello'
import logo from './assets/typescript.svg'

hello()

const logoWrapElement = document.getElementById('target')

if (logoWrapElement) {
  logoWrapElement.insertAdjacentHTML('afterbegin', logo)
}

import { keepAvatarInPlace } from './scripts/avatarPosition'
import { startEngine } from './scripts/engine'
import { keepMilestonesInPlace } from './scripts/keepMilestonesInPlace'

import './assets/fonts/fonts.css'
import './styles/main.css'
import './styles/style.scss'

keepMilestonesInPlace()
keepAvatarInPlace()
startEngine()

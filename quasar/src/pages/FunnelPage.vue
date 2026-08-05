<template>
  <component :is="comp" :screen="f.screen" :key="f.screen.id + f.lang" />
</template>

<script setup>
import { computed } from 'vue'
import { useFunnel } from 'stores/funnel'

import SingleChoice from 'components/screens/SingleChoice.vue'
import MultiChoice from 'components/screens/MultiChoice.vue'
import SalaryScreen from 'components/screens/SalaryScreen.vue'
import CountryScreen from 'components/screens/CountryScreen.vue'
import InterScreen from 'components/screens/InterScreen.vue'
import StatScreen from 'components/screens/StatScreen.vue'
import RelateScreen from 'components/screens/RelateScreen.vue'
import ResumeScreen from 'components/screens/ResumeScreen.vue'
import LinkedInAddScreen from 'components/screens/LinkedInAddScreen.vue'
import UploadingScreen from 'components/screens/UploadingScreen.vue'
import UploadDoneScreen from 'components/screens/UploadDoneScreen.vue'
import JobTitlesScreen from 'components/screens/JobTitlesScreen.vue'
import BenefitScreen from 'components/screens/BenefitScreen.vue'
import ScoreScreen from 'components/screens/ScoreScreen.vue'
import SpeedScreen from 'components/screens/SpeedScreen.vue'
import ThreeXScreen from 'components/screens/ThreeXScreen.vue'
import CityScreen from 'components/screens/CityScreen.vue'
import CategoryChipsScreen from 'components/screens/CategoryChipsScreen.vue'
import CompareScreen from 'components/screens/CompareScreen.vue'
import ChartScreen from 'components/screens/ChartScreen.vue'
import LoaderScreen from 'components/screens/LoaderScreen.vue'
import ResultScreen from 'components/screens/ResultScreen.vue'
import SignupScreen from 'components/screens/SignupScreen.vue'
import PaywallScreen from 'components/screens/PaywallScreen.vue'
import SuccessScreen from 'components/screens/SuccessScreen.vue'

const f = useFunnel()

// Dev-only helper: lets you drive the funnel from the console (window.__funnel)
if (process.env.DEV) window.__funnel = f

const MAP = {
  single: SingleChoice,
  multi: MultiChoice,
  salary: SalaryScreen,
  country: CountryScreen,
  inter: InterScreen,
  stat: StatScreen,
  relate: RelateScreen,
  resume: ResumeScreen,
  liHandle: LinkedInAddScreen,
  benefit: BenefitScreen,
  score: ScoreScreen,
  speed: SpeedScreen,
  x3: ThreeXScreen,
  city: CityScreen,
  catchips: CategoryChipsScreen,
  uploading: UploadingScreen,
  uploaddone: UploadDoneScreen,
  titles: JobTitlesScreen,
  compare: CompareScreen,
  chart: ChartScreen,
  loader: LoaderScreen,
  result: ResultScreen,
  signup: SignupScreen,
  paywall: PaywallScreen,
  success: SuccessScreen
}

const comp = computed(() => MAP[f.screen.type])
</script>

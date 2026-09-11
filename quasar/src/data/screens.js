// Funnel content & flow — restructured version (v2).
// Every text is an [en, es] pair. Branch conditions receive the funnel store.
// The previous flow is preserved at /old (git tag: pre-restructure).
/* eslint-disable */
const PHASES = ['CURRENT STATUS','AI EXPERIENCE','YOUR RESUME','YOUR GOALS','JOB PREFERENCES','HOW WE HELP','YOUR RESULTS'];
const PHASE_ICONS = ['user','zap','file-text','target','sliders','heart','award'];
const EU = ['Spain','France','Germany','Italy','Portugal','Netherlands','Belgium','Austria','Ireland','Sweden','Denmark','Finland','Poland','Czechia','Romania','Hungary','Greece','Bulgaria','Croatia','Slovakia','Slovenia','Lithuania','Latvia','Estonia','Luxembourg','Malta','Cyprus'];
const CDATA = [['Spain','🇪🇸'],['France','🇫🇷'],['Germany','🇩🇪'],['Italy','🇮🇹'],['Portugal','🇵🇹'],['Netherlands','🇳🇱'],['Belgium','🇧🇪'],['Austria','🇦🇹'],['Ireland','🇮🇪'],['Sweden','🇸🇪'],['Denmark','🇩🇰'],['Finland','🇫🇮'],['Poland','🇵🇱'],['Czechia','🇨🇿'],['Romania','🇷🇴'],['Hungary','🇭🇺'],['Greece','🇬🇷'],['Bulgaria','🇧🇬'],['Croatia','🇭🇷'],['Slovakia','🇸🇰'],['Slovenia','🇸🇮'],['Lithuania','🇱🇹'],['Latvia','🇱🇻'],['Estonia','🇪🇪'],['Luxembourg','🇱🇺'],['Malta','🇲🇹'],['Cyprus','🇨🇾'],['United States','🇺🇸'],['United Kingdom','🇬🇧'],['Switzerland','🇨🇭'],['Norway','🇳🇴'],['Mexico','🇲🇽'],['Argentina','🇦🇷'],['Colombia','🇨🇴'],['Chile','🇨🇱'],['Peru','🇵🇪'],['Uruguay','🇺🇾'],['Ecuador','🇪🇨'],['Venezuela','🇻🇪'],['Brazil','🇧🇷'],['Canada','🇨🇦'],['Australia','🇦🇺'],['New Zealand','🇳🇿'],['Japan','🇯🇵'],['India','🇮🇳'],['Morocco','🇲🇦'],['Turkey','🇹🇷'],['United Arab Emirates','🇦🇪'],['South Africa','🇿🇦'],['Philippines','🇵🇭'],['Dominican Republic','🇩🇴'],['Other','🌍']].sort((a,b)=>a[0].localeCompare(b[0]));
const COUNTRIES = CDATA.map(c=>c[0]);
const flagOf = n => (CDATA.find(c=>c[0]===n)||[,'🌍'])[1];
// ISO-3166 alpha-2 codes (used to filter city autocomplete results)
const CCODE = {Spain:'ES',France:'FR',Germany:'DE',Italy:'IT',Portugal:'PT',Netherlands:'NL',Belgium:'BE',Austria:'AT',Ireland:'IE',Sweden:'SE',Denmark:'DK',Finland:'FI',Poland:'PL',Czechia:'CZ',Romania:'RO',Hungary:'HU',Greece:'GR',Bulgaria:'BG',Croatia:'HR',Slovakia:'SK',Slovenia:'SI',Lithuania:'LT',Latvia:'LV',Estonia:'EE',Luxembourg:'LU',Malta:'MT',Cyprus:'CY','United States':'US','United Kingdom':'GB',Switzerland:'CH',Norway:'NO',Mexico:'MX',Argentina:'AR',Colombia:'CO',Chile:'CL',Peru:'PE',Uruguay:'UY',Ecuador:'EC',Venezuela:'VE',Brazil:'BR',Canada:'CA',Australia:'AU','New Zealand':'NZ',Japan:'JP',India:'IN',Morocco:'MA',Turkey:'TR','United Arab Emirates':'AE','South Africa':'ZA',Philippines:'PH','Dominican Republic':'DO'};

// Job categories (used by the categories chips screen)
const CATEGORIES = [
 ["I'm open to any role",'Estoy abierto a cualquier puesto'],
 ['Data Entry / Typing Jobs','Entrada de datos / Mecanografía'],
 ['Customer Service','Atención al cliente'],
 ['Sales & Partnerships','Ventas y Partnerships'],
 ['Marketing & PR','Marketing y PR'],
 ['IT & Software','IT y Software'],
 ['Design (Graphic, UX, Product)','Diseño (gráfico, UX, producto)'],
 ['Content, Writing & Media','Contenido, Escritura y Medios'],
 ['Admin & Operations','Admin y Operaciones'],
 ['Data & Analytics','Datos y Analítica'],
 ['Finance','Finanzas'],
 ['HR & Recruitment','RR. HH. y Selección'],
 ['Legal','Legal'],
 ['Healthcare','Sanidad'],
 ['Education & Training','Educación y Formación'],
 ['Research','Investigación']
];

// Autocomplete pool for the job-titles input
const TITLE_SUGGESTIONS = [
'Account Executive','Account Manager','Accountant','Administrative Assistant','Backend Developer','Business Analyst','Business Development Manager','Content Marketing Manager','Content Writer','Copywriter','Customer Success Manager','Customer Support Engineer','Customer Support Specialist','Data Analyst','Data Engineer','Data Entry Specialist','Data Scientist','DevOps Engineer','Digital Marketing Specialist','Executive Assistant','Financial Analyst','Frontend Developer','Full Stack Developer','Graphic Designer','Growth Marketing Manager','HR Generalist','HR Manager','Instructional Designer','IT Support Specialist','Java Developer','Legal Assistant','Machine Learning Engineer','Marketing Assistant','Marketing Manager','Medical Coder','Mobile Developer','Motion Designer','办Office Manager','Online Tutor','Operations Coordinator','Operations Manager','Paid Media Specialist','Payroll Specialist','Product Designer','Product Manager','Product Marketing Manager','Project Coordinator','Project Manager','Python Developer','QA Engineer','Recruiter','Research Analyst','Sales Development Representative','Sales Manager','Scrum Master','SEO Specialist','Social Media Manager','Software Engineer','Solutions Architect','Support Team Lead','Talent Acquisition Specialist','Technical Account Manager','Technical Recruiter','Technical Writer','UX Researcher','UX/UI Designer','Virtual Assistant','Web Designer','Web Developer'
].filter(t=>!/办/.test(t));

const S = [
/* ---------------- PHASE 0 · CURRENT STATUS ---------------- */
{id:'P1',phase:0,type:'single',title:["What's your current work status?",'¿Cuál es tu situación laboral actual?'],
 opts:[{i:'briefcase',t:["I'm unemployed",'Estoy sin empleo']},{i:'building',t:["I'm employed",'Tengo empleo']},{i:'laptop',t:["I'm self-employed / freelancing",'Trabajo por cuenta propia / freelance']},{i:'gradcap',t:["I'm a student / looking for my first job",'Estudiante / busco mi primer empleo']}]},
{id:'P2',phase:0,type:'single',title:['How are you approaching your job search right now?','¿Cómo estás enfocando tu búsqueda ahora mismo?'],
 opts:[{i:'search',t:['Actively searching','Buscando activamente']},{i:'eye',t:['Open to opportunities','Abierto a oportunidades']},{i:'compass',t:['Just exploring','Solo explorando']}]},
{id:'P8',phase:0,type:'salary',title:["What's your desired minimum salary?",'¿Cuál es tu salario mínimo deseado?'],
 sub:["We'll only show you jobs that meet your minimum.",'Solo te mostraremos empleos que cumplan tu mínimo.']},
{id:'P3',phase:0,type:'single',icons:false,title:['How long have you been job hunting?','¿Cuánto tiempo llevas buscando empleo?'],
 opts:[{t:['Just started (<1 month)','Acabo de empezar (menos de 1 mes)']},{t:['1–3 months','1-3 meses']},{t:['3–6 months','3-6 meses']},{t:['6+ months','Más de 6 meses']},{t:["I'm not actively looking right now",'No estoy buscando activamente ahora']}]},
{id:'P3b',phase:0,type:'chart',
 title:['55% of our members interview within the 1st month','El 55% de nuestros miembros consigue entrevista en el primer mes'],
 sub:["We'll help you get there too",'Te ayudaremos a conseguirlo también'],
 note:['Based on JobWinner users who track their job search on our platform','Basado en usuarios de JobWinner que registran su búsqueda de empleo en la plataforma']},

/* ---------------- PHASE 1 · AI EXPERIENCE ---------------- */
{id:'P6',phase:1,type:'single',title:['Have you ever tried smart tools like AI to make your job search easier?','¿Has probado herramientas inteligentes como la IA para facilitar tu búsqueda de empleo?'],
 opts:[{i:'yes',t:['Yes','Sí']},{i:'notsure',t:['Not sure','No estoy seguro']},{i:'no',t:['No','No']}]},
{id:'PH1',phase:1,type:'single',title:['Where can JobWinner help you the most?','¿Dónde puede ayudarte más JobWinner?'],
 opts:[
  {i:'search',k:'matches',t:['Find jobs that match my profile','Encontrar empleos que encajen con mi perfil']},
  {i:'users2',k:'interviews',t:['Get more interviews','Conseguir más entrevistas']},
  {i:'boltcirc',k:'speed',t:['Apply to jobs faster and save time','Aplicar más rápido y ahorrar tiempo']},
  {i:'mic',k:'prep',t:['Prepare for interviews','Prepararme las entrevistas']},
  {i:'grid',k:'all',t:['All of the above','Todo lo anterior']}
 ]},
{id:'PB1',phase:1,type:'benefit',variant:'matches',cond:(st)=>st.answers.PH1 && st.answers.PH1.k==='matches',
 title:['JobWinner finds the best matching jobs for you across 5M+ open jobs','JobWinner encuentra los empleos que mejor encajan contigo entre más de 5M de ofertas']},
{id:'PB1b',phase:1,type:'iceberg',cond:(st)=>st.answers.PH1 && st.answers.PH1.k==='matches',
 title:['Access 750k+ hidden jobs monthly','Accede a más de 750k empleos ocultos al mes'],
 sub:['Get access to private roles and exclusive listings not found on public job boards','Accede a puestos privados y ofertas exclusivas que no aparecen en los portales de empleo públicos'],
 note:['Most job seekers only see 1/4 of opportunities','La mayoría de candidatos solo ve 1/4 de las oportunidades']},
{id:'PB2',phase:1,type:'benefit',variant:'ats',cond:(st)=>st.answers.PH1 && st.answers.PH1.k==='interviews',
 title:['JobWinner gets you up to 3× more interviews with tailored job applications','JobWinner te consigue hasta 3× más entrevistas con solicitudes hechas a medida']},
{id:'PB3',phase:1,type:'benefit',variant:'speed',cond:(st)=>st.answers.PH1 && st.answers.PH1.k==='speed',
 title:['With JobWinner every application takes just ~5 minutes','Con JobWinner cada solicitud lleva solo ~5 minutos']},
{id:'PB4',phase:1,type:'benefit',variant:'prep',cond:(st)=>st.answers.PH1 && st.answers.PH1.k==='prep',
 title:['Practice interviews with AI before the real one','Practica entrevistas con IA antes de la de verdad']},
{id:'PBALL',phase:1,type:'benefit',variant:'all',cond:(st)=>st.answers.PH1 && st.answers.PH1.k==='all',
 title:['You are in the right place, we can help you from start to finish.','Estás en el lugar adecuado: te ayudamos de principio a fin.']},

/* ---------------- PHASE 2 · YOUR RESUME ---------------- */
{id:'P18',phase:2,type:'single',title:['What best describes your resume right now?','¿Qué describe mejor tu CV ahora mismo?'],
 opts:[{i:'doccheck',t:['Up-to-date resume','CV al día']},{i:'pen',t:['Resume needs updates','El CV necesita cambios']},{i:'liD',t:['LinkedIn only','Solo LinkedIn']},{i:'docdash',t:['No resume yet','Aún no tengo CV']}]},
{id:'P19',phase:2,type:'resume',cond:(st)=>{const a=st.answers.P18; return !!a && (a.t[0]==='Up-to-date resume'||a.t[0]==='Resume needs updates')},
 title:['Get better job matches','Mejora tus matches de empleo'],
 sub:['Add your resume to improve your matches. Even a draft or outdated resume can significantly improve job recommendations for you.','Añade tu CV para mejorar tus matches. Incluso un borrador o un CV desactualizado puede mejorar mucho tus recomendaciones.']},
{id:'PLIH',phase:2,type:'liHandle',cond:(st)=>{const a=st.answers.P18; return !!a && a.t[0]==='LinkedIn only'},
 title:['Add your LinkedIn profile','Añade tu perfil de LinkedIn'],
 sub:['This helps us recommend more relevant jobs for you','Esto nos ayuda a recomendarte empleos más relevantes para ti']},
{id:'PNORES',phase:2,type:'inter',illo:'resume',cond:(st)=>{const a=st.answers.P18; return !!a && a.t[0]==='No resume yet'},
 title:["No worries — you can add it later",'Sin problema: puedes añadirlo más tarde'],
 body:['You can upload or create a resume anytime. Our AI Resume Builder will help you make one in minutes.','Puedes subir o crear un CV cuando quieras. Nuestro AI Resume Builder te ayuda a hacerlo en minutos.']},
{id:'P19b',phase:2,type:'uploading',cond:(st)=>!!st.upload},
{id:'P19c',phase:2,type:'uploaddone',cond:(st)=>!!st.upload},
{id:'P19S',phase:2,type:'score',cond:(st)=>!!st.upload,
 title:["Pretty good! But there's still potential!",'¡Nada mal! Pero aún hay potencial']},

/* ---------------- PHASE 3 · YOUR GOALS ---------------- */
{id:'PSPEED',phase:3,type:'speed',title:['How fast do you want to find a job?','¿Cómo de rápido quieres encontrar empleo?']},
{id:'P3X',phase:3,type:'x3',title:['With JobWinner, landing 3× more interviews is realistic.','Con JobWinner, conseguir 3× más entrevistas es realista.']},

/* ---------------- PHASE 4 · JOB PREFERENCES ---------------- */
{id:'P9',phase:4,type:'multi',title:['What type of jobs do you prefer?','¿Qué tipo de empleos prefieres?'],
 opts:[{i:'house',t:['Fully remote','100% remoto']},{i:'hybrid',t:['Hybrid','Híbrido']},{i:'towers',t:['In-office','Presencial']}]},
{id:'P11',phase:4,type:'country',title:['Which country are you based in?','¿En qué país resides?'],
 micro:["If you're a digital nomad, select your tax home.",'Si eres nómada digital, elige tu residencia fiscal.']},
{id:'PCITY',phase:4,type:'city',title:['',''],
 sub:['City, region or "anywhere"','Ciudad, zona o "cualquier lugar"']},
{id:'P19T',phase:4,type:'titles',
 title:['Tell us what job title(s) you have in mind.','Dinos qué puesto(s) tienes en mente.']},
{id:'P13',phase:4,type:'catchips',title:['Which job categories interest you?','¿Qué categorías de empleo te interesan?']},
{id:'P16',phase:4,type:'single',title:["What's your career level?",'¿Cuál es tu nivel profesional?'],
 opts:[
  {i:'user1',t:['Entry / Junior','Entry / Junior'],sub:['0–2 years of experience','0-2 años de experiencia']},
  {i:'growth',t:['Mid-level','Mid-level'],sub:['2–5 years of experience','2-5 años de experiencia']},
  {i:'medal',t:['Senior','Senior'],sub:['5–10 years of experience','5-10 años de experiencia']},
  {i:'crown',t:['Lead / Manager','Lead / Manager'],sub:['10+ years · Leadership role','10+ años · Rol de liderazgo']}
 ]},
{id:'P7',phase:4,type:'multi',title:['What type of work are you open to?','¿A qué tipo de trabajo estás abierto?'],
 opts:[{i:'clockfull',t:['Full-time','Full-time']},{i:'clockhalf',t:['Part-time','Part-time']},{i:'pen',t:['Freelance / Contract','Freelance / Contrato']},{i:'book',t:['Internship','Prácticas']}]},
{id:'PPOT',phase:4,type:'potential',
 title:['You have great potential to reach your goal with us','You have great potential to reach your goal with us']},
{id:'PREV',phase:4,type:'reviews',
 title:['Thanks for trusting us','Gracias por confiar en nosotros']},
{id:'PTHANKS',phase:4,type:'inter',illo:'target',big:true,
 title:['Time to create a personalized plan for you!','¡Hora de crear un plan personalizado para ti!'],
 body:["We now have a clear picture of where you're at. Let's find the jobs that truly fit you.",'Ya tenemos una idea clara de dónde estás. Vamos a por los empleos que de verdad encajan contigo.'],
 cta:['CREATE PLAN','Crear plan']},
{id:'PEMAIL',phase:4,type:'email',
 title:['Where should we send your personalized plan?','¿Dónde te enviamos tu plan personalizado?'],
 sub:["We'll save your plan and your job matches to this email.",'Guardaremos tu plan y tus empleos compatibles en este email.']},

/* ---------------- PHASE 5 · HOW WE HELP (RJF pre-suasion block) ---------------- */
{id:'P21',phase:5,type:'inter',illo:'brutal',title:['The job market got brutal','El mercado se ha vuelto brutal'],
 list:[{i:'users',t:['Way more people competing for the same jobs','Mucha más gente compitiendo por los mismos empleos']},{i:'code',t:['Companies now use complex software to filter applications','Las empresas usan software complejo para filtrar candidaturas']},{i:'copy',t:['Most job boards show the same expired listings','La mayoría de portales muestran las mismas ofertas caducadas']},{i:'alerttri',t:['Fake listings are everywhere','Las ofertas falsas están por todas partes']}]},
{id:'P22',phase:5,type:'inter',illo:'puzzle',title:["We've solved the job search puzzle",'Hemos resuelto el puzzle de la búsqueda de empleo'],
 body:["We've analyzed 20 million jobs for 150,000 users. Now we know what gets people hired. You benefit from proven job search strategies.",'Hemos analizado 20 millones de empleos para 150.000 usuarios. Ahora sabemos qué consigue que te contraten. Te beneficias de estrategias de búsqueda probadas.']},
{id:'P23',phase:5,type:'relate',quote:['Every job I like on LinkedIn already has 200+ applications','Cada empleo que me gusta en LinkedIn ya tiene 200+ candidaturas']},
{id:'P24',phase:5,type:'stat',pct:57,eyebrow:['Bad news','Malas noticias'],
 title:["It's easy to feel invisible",'Es fácil sentirse invisible'],
 body:['57% of remote jobs get 300+ applications within 24 hours. No wonder it’s easy to feel invisible.','El 57% de los empleos remotos reciben 300+ candidaturas en 24 horas. No es de extrañar que sea fácil sentirse invisible.']},
{id:'P25',phase:5,type:'inter',illo:'radar',eyebrow:['Good news for you','Buenas noticias para ti'],
 title:['New jobs appear here first','Los nuevos empleos aparecen aquí primero'],
 body:['We scan 1,000+ job sources every day. New jobs appear here first. Apply before others see these listings.','Escaneamos 1.000+ fuentes de empleo cada día. Los nuevos empleos aparecen aquí primero. Aplica antes de que otros vean estas ofertas.']},
{id:'P26',phase:5,type:'relate',quote:["I'm afraid my resume disappears into a black hole",'Me da miedo que mi CV desaparezca en un agujero negro']},
{id:'P27',phase:5,type:'stat',pct:80,eyebrow:['The truth about listings','La verdad sobre las ofertas'],
 title:['Only 20% of listings actually hire','Solo el 20% de las ofertas contrata de verdad'],
 body:["80% of remote job postings aren't active — they're just market research. Our AI surfaces the other 20% that actually hire.",'El 80% de las ofertas de empleo remoto no están activas, solo son sondeo de mercado. Nuestra IA selecciona el otro 20% que sí contrata.']},
{id:'P28',phase:5,type:'relate',quote:['I think software filters my resume before recruiters see it','Creo que un software filtra mi CV antes de que lo vea un reclutador']},
{id:'P29',phase:5,type:'stat',pct:75,eyebrow:['What really happens','Lo que realmente pasa'],
 title:['Most resumes never reach a human','La mayoría de CV nunca llegan a un humano'],
 body:['75% of resumes never reach a human recruiter. ATS systems auto-reject them, often by mistake.','El 75% de los CV nunca llegan a un reclutador humano. Los sistemas ATS los rechazan automáticamente, a menudo por error.']},
{id:'P30',phase:5,type:'inter',illo:'mailflow',title:['From black holes to responses','De agujeros negros a respuestas'],
 body:['We optimize your resume for ATS and make sure it gets to the humans who actually make decisions.','Optimizamos tu CV para el ATS y nos aseguramos de que llegue a las personas que de verdad deciden.']},
{id:'P31',phase:5,type:'single',title:['What schedule do you prefer?','¿Qué horario prefieres?'],
 opts:[{i:'sun',t:['Flexible hours','Horario flexible']},{i:'clockfull',t:['9 to 5 fixed schedule','Horario fijo de 9 a 5']}]},
{id:'P32',phase:5,type:'single',title:['What team size do you prefer?','¿Qué tamaño de equipo prefieres?'],
 opts:[{i:'users3',t:['Big teams','Equipos grandes']},{i:'users2',t:['Small teams','Equipos pequeños']},{i:'user1',t:['Independent','Independiente']}]},
{id:'P33',phase:5,type:'multi',title:['What company size do you prefer?','¿Qué tamaño de empresa prefieres?'],
 opts:[{i:'rocket',t:['Startup','Startup']},{i:'building',t:['Mid-sized','Mediana']},{i:'towers',t:['Corporation','Corporación']}]},
{id:'P34',phase:5,type:'multi',icons:false,title:['What benefits matter most to you?','¿Qué beneficios te importan más?'],
 opts:[{t:['Flexible PTO','PTO flexible']},{t:['Health insurance','Seguro médico']},{t:['Home office budget','Presupuesto para oficina en casa']},{t:['Equipment provided','Equipo proporcionado']},{t:['Parental leave','Baja parental']},{t:['Learning budget','Presupuesto de formación']},{t:['Career advancement','Desarrollo de carrera']},{t:['Mental health support','Apoyo a salud mental']},{t:['Conference expenses','Gastos de conferencias']},{t:['International opportunities','Oportunidades internacionales']},{t:['Wellness programs','Programas de bienestar']}]},
{id:'P35',phase:5,type:'relate',quote:['I worry ATS filters out my resume before a recruiter sees it','Me preocupa que el ATS filtre mi CV antes de que lo vea un reclutador']},
{id:'P36',phase:5,type:'inter',illo:'vault',title:['750k+ hidden jobs every month','750k+ empleos ocultos al mes'],
 body:["Access private roles and exclusive listings that aren't on public job boards. Most people only see 1/4 of the opportunities.",'Accede a roles privados y ofertas exclusivas que no están en los portales públicos. La mayoría solo ve 1/4 de las oportunidades.']},
{id:'P37',phase:5,type:'relate',quote:["LinkedIn's filters rarely show roles that actually fit my background",'Los filtros de LinkedIn rara vez muestran roles que encajan con mi perfil']},
{id:'P38',phase:5,type:'relate',quote:["I waste so much time scrolling endlessly, but can't find anything that actually fits me",'Pierdo mucho tiempo haciendo scroll sin fin, pero no encuentro nada que encaje conmigo']},
{id:'P39',phase:5,type:'relate',quote:["I'm exhausted jumping between different job sites, checking the same positions",'Estoy agotado de saltar entre distintos portales revisando los mismos puestos']},
{id:'P40',phase:5,type:'relate',quote:['Sometimes I see job listings that feel like fake or scam','A veces veo ofertas que parecen falsas o estafa']},
{id:'P41',phase:5,type:'relate',quote:['I rarely find job listings that match my background','Rara vez encuentro ofertas que encajen con mi perfil']},
{id:'P42',phase:5,type:'compare',title:['A smarter way to search','Una forma más inteligente de buscar'],
 body:["Only verified opportunities that actually fit you, so you don't waste time.",'Solo oportunidades verificadas que encajan contigo, para que no pierdas el tiempo.']},
{id:'P43',phase:5,type:'relate',quote:["I'm sick of filling out the same job application forms over and over again",'Estoy harto de rellenar los mismos formularios de solicitud una y otra vez']},
{id:'P44',phase:5,type:'inter',illo:'formclock',eyebrow:["It's worse than it looks",'Es peor de lo que parece'],
 title:['Forms are eating your search','Los formularios se comen tu búsqueda'],
 body:['The average application takes 30+ minutes. 90% of it is repetitive data entry. Most people spend more time on forms than searching.','Una solicitud media tarda 30+ minutos. El 90% es introducción de datos repetitiva. La mayoría pasa más tiempo en formularios que buscando.']},
{id:'P45',phase:5,type:'single',title:['How much time can you spend applying daily?','¿Cuánto tiempo puedes dedicar a aplicar al día?'],
 opts:[{i:'bolt',t:['3–4 hours','3-4 horas']},{i:'clockfull',t:['1–2 hours','1-2 horas']},{i:'clockhalf',t:['30–60 mins','30-60 min']},{i:'hourglass',t:['10–30 mins','10-30 min']},{i:'meh',t:['Too busy to apply','Demasiado ocupado para aplicar']}]},
{id:'P46',phase:5,type:'multi',icons:false,title:['What stops you from applying to more jobs?','¿Qué te impide aplicar a más empleos?'],
 opts:[{t:["I don't have enough time",'No tengo suficiente tiempo']},{t:['Forms are exhausting','Los formularios agotan']},{t:['Too many options to track','Demasiadas opciones que seguir']},{t:['Deadlines pass too quickly','Los plazos pasan demasiado rápido']},{t:['Lose track of applications','Pierdo el hilo de mis candidaturas']},{t:['Get distracted from applying','Me distraigo y no aplico']}]},
{id:'P47',phase:5,type:'inter',illo:'x3',
 title:['We prepare a tailored application for every matching job','Preparamos tu solicitud personalizada para cada oferta'],
 body:['Resume and cover letter tailored to each listing in minutes, not hours. Get 3X more quality applications without the repetitive forms.','CV y carta adaptados a cada oferta en minutos, no en horas. Consigue 3X más candidaturas de calidad sin formularios repetitivos.']},

/* -------- PHASE 7 · RESULTS -------- */

/* ---------------- PHASE 6 · RESULTS ---------------- */
{id:'P48',phase:6,type:'loader',title:['Generating a personalized plan to land your next role','Generando un plan personalizado para conseguir tu próximo empleo']},
{id:'P49',phase:6,type:'result'},
{id:'P50',phase:6,type:'signup'}, // el pricing/countdown vive dentro del result (P49)
{id:'P52',phase:6,type:'success'}
];

// Precios REALES de los Stripe Payment Links (el checkout cobra en EUR).
// "old" = precio de referencia del 60% OFF. El símbolo de moneda mostrado se decide por país en ResultScreen.
const PLANS=[
  {key:'weekly', name:['1 Week Plan','Plan Semanal'], price:9.00, days:7, old:22.50,
   link:'https://buy.stripe.com/8x2bJ1cOvesG4DJe1z5ZC0s',
   bill:['Billed weekly, cancel anytime.','Facturación semanal, cancela cuando quieras.']},
  {key:'monthly', name:['One Month Plan','Plan Mensual'], price:29.00, days:30, old:72.50, popular:true,
   link:'https://buy.stripe.com/8x28wPdSzacqb279Lj5ZC0t',
   bill:['Billed monthly, cancel anytime.','Facturación mensual, cancela cuando quieras.']},
  {key:'lifetime', name:['Lifetime Plan','Plan de por vida'], price:145.00, days:365, old:362.50, once:true,
   link:'https://buy.stripe.com/3cI5kD7ubesGdaf1eN5ZC0u',
   bill:['One-time payment — yours forever.','Pago único: tuyo para siempre.']}
];
export { PHASES, PHASE_ICONS, EU, CDATA, COUNTRIES, CCODE, flagOf, S as SCREENS, PLANS, CATEGORIES, TITLE_SUGGESTIONS }

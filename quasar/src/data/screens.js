// Funnel content & flow — restructured version (v2).
// Every text is an [en, es] pair. Branch conditions receive the funnel store.
// The previous flow is preserved at /old (git tag: pre-restructure).
/* eslint-disable */
const PHASES = ['CURRENT STATUS','AI EXPERIENCE','YOUR RESUME','YOUR GOALS','JOB PREFERENCES','YOUR RESULTS'];
const PHASE_ICONS = ['user','zap','file-text','target','sliders','award'];
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
 title:['55% of our members find a job within the 1st month','El 55% de nuestros miembros encuentra empleo en el primer mes'],
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
{id:'PTHANKS',phase:4,type:'inter',illo:'target',
 title:['Time to create a personalized plan for you!','¡Hora de crear un plan personalizado para ti!'],
 body:["We now have a clear picture of where you're at. Let's find the jobs that truly fit you.",'Ya tenemos una idea clara de dónde estás. Vamos a por los empleos que de verdad encajan contigo.'],
 cta:['CREATE PLAN','Crear plan']},

/* ---------------- PHASE 5 · RESULTS ---------------- */
{id:'P48',phase:5,type:'loader',title:['Generating a personalized plan to land your next role','Generando un plan personalizado para conseguir tu próximo empleo']},
{id:'P49',phase:5,type:'result'},
{id:'P50',phase:5,type:'signup'},
{id:'P52',phase:5,type:'success'}
];

const PLANS=[
  {name:['1 week','1 semana'], old:'24.99 €', day:'1.43', bill:['Billed 9.99 € per week, cancel anytime.','Se factura 9,99 € por semana, cancela cuando quieras.'], price:'9.99 €'},
  {name:['1 month','1 mes'], old:'49.99 €', day:'0.67', bill:['Billed 19.99 €/month, cancel anytime.','Se factura 19,99 €/mes, cancela cuando quieras.'], price:'19.99 €', popular:true},
  {name:['3 months','3 meses'], old:'99.99 €', day:'0.44', bill:['Billed 39.99 € every 3 months, cancel anytime.','Se factura 39,99 € cada 3 meses, cancela cuando quieras.'], price:'39.99 €'}
];
export { PHASES, PHASE_ICONS, EU, CDATA, COUNTRIES, CCODE, flagOf, S as SCREENS, PLANS, CATEGORIES, TITLE_SUGGESTIONS }

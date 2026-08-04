// Funnel content & flow - ported verbatim from the HTML prototype.
// Every text is an [en, es] pair. Branch conditions receive the funnel store.
/* eslint-disable */
const PHASES = ['CURRENT STATUS','YOUR GOALS','AI EXPERIENCE','JOB PREFERENCES','YOUR BACKGROUND','HOW WE HELP','YOUR RESULTS'];
const PHASE_ICONS = ['user','target','zap','sliders','file-text','heart','award'];
const EU = ['Spain','France','Germany','Italy','Portugal','Netherlands','Belgium','Austria','Ireland','Sweden','Denmark','Finland','Poland','Czechia','Romania','Hungary','Greece','Bulgaria','Croatia','Slovakia','Slovenia','Lithuania','Latvia','Estonia','Luxembourg','Malta','Cyprus'];
const CDATA = [['Spain','🇪🇸'],['France','🇫🇷'],['Germany','🇩🇪'],['Italy','🇮🇹'],['Portugal','🇵🇹'],['Netherlands','🇳🇱'],['Belgium','🇧🇪'],['Austria','🇦🇹'],['Ireland','🇮🇪'],['Sweden','🇸🇪'],['Denmark','🇩🇰'],['Finland','🇫🇮'],['Poland','🇵🇱'],['Czechia','🇨🇿'],['Romania','🇷🇴'],['Hungary','🇭🇺'],['Greece','🇬🇷'],['Bulgaria','🇧🇬'],['Croatia','🇭🇷'],['Slovakia','🇸🇰'],['Slovenia','🇸🇮'],['Lithuania','🇱🇹'],['Latvia','🇱🇻'],['Estonia','🇪🇪'],['Luxembourg','🇱🇺'],['Malta','🇲🇹'],['Cyprus','🇨🇾'],['United States','🇺🇸'],['United Kingdom','🇬🇧'],['Switzerland','🇨🇭'],['Norway','🇳🇴'],['Mexico','🇲🇽'],['Argentina','🇦🇷'],['Colombia','🇨🇴'],['Chile','🇨🇱'],['Peru','🇵🇪'],['Uruguay','🇺🇾'],['Ecuador','🇪🇨'],['Venezuela','🇻🇪'],['Brazil','🇧🇷'],['Canada','🇨🇦'],['Australia','🇦🇺'],['New Zealand','🇳🇿'],['Japan','🇯🇵'],['India','🇮🇳'],['Morocco','🇲🇦'],['Turkey','🇹🇷'],['United Arab Emirates','🇦🇪'],['South Africa','🇿🇦'],['Philippines','🇵🇭'],['Dominican Republic','🇩🇴'],['Other','🌍']].sort((a,b)=>a[0].localeCompare(b[0]));
const COUNTRIES = CDATA.map(c=>c[0]);

const flagOf = n => (CDATA.find(c=>c[0]===n)||[,'🌍'])[1];

const S = [
/* -------- PHASE 1 · CURRENT STATUS -------- */
{id:'P1',phase:0,type:'single',title:["What's your current work status?",'¿Cuál es tu situación laboral actual?'],
 opts:[{i:'briefcase',t:["I'm unemployed",'Estoy sin empleo']},{i:'building',t:["I'm employed",'Tengo empleo']},{i:'laptop',t:["I'm self-employed / freelancing",'Trabajo por cuenta propia / freelance']},{i:'gradcap',t:["I'm a student / looking for my first job",'Estudiante / busco mi primer empleo']}]},
{id:'P2',phase:0,type:'single',title:['How are you approaching your job search right now?','¿Cómo estás enfocando tu búsqueda ahora mismo?'],
 opts:[{i:'search',t:['Actively searching','Buscando activamente']},{i:'eye',t:['Open to opportunities','Abierto a oportunidades']},{i:'compass',t:['Just exploring','Solo explorando']}]},
{id:'P3',phase:0,type:'single',icons:false,title:['How long have you been job hunting?','¿Cuánto tiempo llevas buscando empleo?'],
 opts:[{t:['Just started (<1 month)','Acabo de empezar (menos de 1 mes)']},{t:['1–3 months','1-3 meses']},{t:['3–6 months','3-6 meses']},{t:['6+ months','Más de 6 meses']},{t:["I'm not actively looking right now",'No estoy buscando activamente ahora']}]},
{id:'P3b',phase:0,type:'chart',
 title:['65% of our members find a job within the 1st month','El 65% de nuestros miembros encuentra empleo en el primer mes'],
 sub:["We'll help you get there too",'Te ayudaremos a conseguirlo también'],
 note:['Based on JobWinner users who track their job search on our platform','Basado en usuarios de JobWinner que registran su búsqueda de empleo en la plataforma']},

/* -------- PHASE 2 · YOUR GOALS -------- */
{id:'P4',phase:1,type:'multi',title:['What are you looking for?','¿Qué estás buscando?'],
 opts:[{i:'growth',t:['To move up in my career','Ascender en mi carrera']},{i:'swap',t:['Career switch to something new','Cambiar de carrera a algo nuevo']},{i:'rocket',t:['First full-time job for career start','Mi primer empleo a tiempo completo']},{i:'shieldcheck',t:['Secure, long-term job in my field','Un empleo estable y a largo plazo en mi campo']},{i:'scale',t:['Better work-life balance','Mejor equilibrio vida-trabajo']},{i:'urgent',t:['Urgent income for my basic needs','Ingreso urgente para mis necesidades básicas']},{i:'coins',t:['Extra source of income','Ingreso extra']}]},
{id:'P5',phase:1,type:'inter',illo:'target',title:['Thanks for sharing your goals!','¡Gracias por compartir tus objetivos!'],
 body:['Now, answer a few quick questions and our AI will pick perfect jobs for you.','Ahora responde unas preguntas rápidas y nuestra IA elegirá los empleos perfectos para ti.']},

/* -------- PHASE 3 · AI EXPERIENCE -------- */
{id:'P6',phase:2,type:'single',title:['Have you ever tried smart tools like AI to make your job search easier?','¿Has probado herramientas inteligentes como la IA para facilitar tu búsqueda de empleo?'],
 opts:[{i:'yes',t:['Yes','Sí']},{i:'notsure',t:['Not sure','No estoy seguro']},{i:'no',t:['No','No']}]},
{id:'P6b',phase:2,type:'inter',illo:'launch',
 title:['AI can make your job search easier — and faster','La IA puede hacer tu búsqueda de empleo más fácil, y más rápida'],
 list:[{i:'search',t:["Discover hidden jobs you'd never see on popular job sites",'Descubre empleos ocultos que nunca verías en los portales populares']},{i:'doc',t:['Turn your resume into the perfect match for every role','Convierte tu currículum en el match perfecto para cada puesto']},{i:'boltcirc',t:['Skip the repetitive forms — we prepare every application for you','Olvídate de los formularios repetitivos: preparamos cada solicitud por ti']},{i:'clockfull',t:['Get hired in weeks, not months','Consigue empleo en semanas, no en meses']}]},

/* -------- PHASE 4 · JOB PREFERENCES -------- */
{id:'P7',phase:3,type:'multi',title:['What type of work are you open to?','¿A qué tipo de trabajo estás abierto?'],
 opts:[{i:'clockfull',t:['Full-time','Full-time']},{i:'clockhalf',t:['Part-time','Part-time']},{i:'pen',t:['Freelance / Contract','Freelance / Contrato']},{i:'book',t:['Internship','Prácticas']}]},
{id:'P8',phase:3,type:'salary',title:["What's your desired minimum salary?",'¿Cuál es tu salario mínimo deseado?'],
 sub:["We'll only show you jobs that meet your minimum.",'Solo te mostraremos empleos que cumplan tu mínimo.']},
{id:'P9',phase:3,type:'multi',title:['What type of jobs do you prefer?','¿Qué tipo de empleos prefieres?'],
 opts:[{i:'house',t:['Fully remote','100% remoto']},{i:'hybrid',t:['Hybrid','Híbrido']},{i:'towers',t:['In-office','Presencial']}]},
{id:'P10',phase:3,type:'multi',title:['What do you like most about working remotely?','¿Qué es lo que más te gusta de trabajar en remoto?'],
 opts:[{i:'car',t:['No commuting time','Sin tiempo de desplazamiento']},{i:'family',t:['Family or personal needs','Necesidades familiares o personales']},{i:'globe',t:['Access to more job opportunities','Acceso a más oportunidades']},{i:'pin',t:['Freedom to work from anywhere','Libertad de trabajar desde cualquier sitio']},{i:'sun',t:['Flexible schedule','Horario flexible']}]},
{id:'P11',phase:3,type:'country',title:['Which country are you based in?','¿En qué país resides?'],
 micro:["If you're a digital nomad, select your tax home.",'Si eres nómada digital, elige tu residencia fiscal.']},
{id:'P12',phase:3,type:'single',icons:false,dynamic:'workAuth',title:['',''],
 opts:[{t:['No','No']},{t:['Yes','Sí']}]},
{id:'P12b',phase:3,type:'inter',illo:'shield',cond:(st)=>st.answers.P12 && st.answers.P12.t[0]==='No',
 title:["Don't worry",'No te preocupes'],
 body:(st,lang)=>{const c=st.answers.P11||'';const zone=c==='United States'?['US','EE. UU.']:(EU.includes(c)?['EU','UE']:[c,c]);
   return lang==='en'?`We've got plenty of jobs that don't require ${zone[0]} work authorization — we'll match you with the right ones.`:`Tenemos muchos empleos que no requieren autorización de trabajo en ${zone[1]}; te emparejaremos con los adecuados.`}},
{id:'P13',phase:3,type:'multi',icons:false,grid2:true,title:['Which job categories interest you?','¿Qué categorías de empleo te interesan?'],
 opts:[{t:["I'm open to any role",'Estoy abierto a cualquier puesto']},{t:['Data Entry / Typing Jobs','Entrada de datos / Mecanografía']},{t:['Customer Service','Atención al cliente']},{t:['Sales & Partnerships','Ventas y Partnerships']},{t:['Marketing & PR','Marketing y PR']},{t:['IT & Software','IT y Software']},{t:['Design (Graphic, UX, Product)','Diseño (gráfico, UX, producto)']},{t:['Content, Writing & Media','Contenido, Escritura y Medios']},{t:['Admin & Operations','Admin y Operaciones']},{t:['Data & Analytics','Datos y Analítica']},{t:['Finance','Finanzas']},{t:['HR & Recruitment','RR. HH. y Selección']},{t:['Legal','Legal']},{t:['Healthcare','Sanidad']},{t:['Education & Training','Educación y Formación']},{t:['Research','Investigación']}]},

/* -------- PHASE 5 · YOUR BACKGROUND -------- */
{id:'P14',phase:4,type:'single',icons:false,title:['What is your highest level of education?','¿Cuál es tu nivel de estudios más alto?'],
 opts:[{t:['No formal education','Sin estudios formales']},{t:['High school','Bachillerato / Secundaria']},{t:['Associate','Grado medio (Associate)']},{t:["Bachelor's",'Grado (Bachelor’s)']},{t:["Master's",'Máster']},{t:['Professional degree (JD, MD, etc.)','Título profesional (JD, MD, etc.)']},{t:['Doctoral','Doctorado']}]},
{id:'P15',phase:4,type:'single',icons:false,title:['How many years of total work experience do you have?','¿Cuántos años de experiencia laboral total tienes?'],
 opts:[{t:['0–1 year','0-1 año']},{t:['2–4 years','2-4 años']},{t:['5–9 years','5-9 años']},{t:['10–19 years','10-19 años']},{t:['20+ years','20+ años']}]},
{id:'P16',phase:4,type:'single',icons:false,title:["What's your current professional level?",'¿Cuál es tu nivel profesional actual?'],
 opts:[{t:['Entry','Entry']},{t:['Junior (<2 years)','Junior (menos de 2 años)']},{t:['Middle (2-4 years)','Middle (2-4 años)']},{t:['Senior (5+ years)','Senior (5+ años)']},{t:['Lead / Manager','Lead / Manager']},{t:['Director','Director']},{t:['VP / C-level','VP / C-level']}]},
{id:'P17',phase:4,type:'single',icons:false,title:['Are you open to lower-level roles?','¿Estás abierto a roles de menor nivel?'],
 opts:[{t:['Yes, if necessary','Sí, si es necesario']},{t:["Maybe, if it's a good fit",'Quizá, si encaja bien']},{t:['No, I only want my level or higher','No, solo mi nivel o superior']}]},
{id:'P18',phase:4,type:'single',title:['What best describes your resume right now?','¿Qué describe mejor tu CV ahora mismo?'],
 opts:[{i:'doccheck',t:['Up-to-date resume','CV al día']},{i:'pen',t:['Resume needs updates','El CV necesita cambios']},{i:'liD',t:['LinkedIn only','Solo LinkedIn']},{i:'docdash',t:['No resume yet','Aún no tengo CV']}]},
{id:'P19',phase:4,type:'resume',title:['Get better job matches','Mejora tus matches de empleo'],
 sub:['Add your resume to improve your matches. Even a draft or outdated resume can significantly improve job recommendations for you.','Añade tu CV para mejorar tus matches. Incluso un borrador o un CV desactualizado puede mejorar mucho tus recomendaciones.']},
{id:'P19L',phase:4,type:'linkedinAdd',cond:(st)=>!st.upload,
 title:['Add your LinkedIn profile','Añade tu perfil de LinkedIn'],
 sub:['This helps us recommend more relevant jobs for you','Esto nos ayuda a recomendarte empleos más relevantes para ti']},
{id:'P19b',phase:4,type:'uploading',cond:(st)=>!!st.upload},
{id:'P19c',phase:4,type:'uploaddone',cond:(st)=>!!st.upload},
{id:'P20',phase:4,type:'multi',icons:false,title:['Which job search strategies have you tried before?','¿Qué estrategias de búsqueda has probado antes?'],
 opts:[{t:['Job boards / direct applications (LinkedIn, Indeed, etc.)','Portales de empleo / candidaturas directas (LinkedIn, Indeed, etc.)']},{t:['Employee referral (friend or colleague)','Referidos de empleados (amigo o colega)']},{t:['Recruitment agencies','Agencias de reclutamiento']},{t:['Networking (events, communities)','Networking (eventos, comunidades)']},{t:['Personal blog / social media','Blog personal / redes sociales']},{t:['Other','Otra']}]},
{id:'P21',phase:4,type:'inter',illo:'brutal',title:['The job market got brutal','El mercado se ha vuelto brutal'],
 list:[{i:'users',t:['Way more people competing for the same jobs','Mucha más gente compitiendo por los mismos empleos']},{i:'code',t:['Companies now use complex software to filter applications','Las empresas usan software complejo para filtrar candidaturas']},{i:'copy',t:['Most job boards show the same expired listings','La mayoría de portales muestran las mismas ofertas caducadas']},{i:'alerttri',t:['Fake listings are everywhere','Las ofertas falsas están por todas partes']}]},
{id:'P22',phase:4,type:'inter',illo:'puzzle',title:["We've solved the job search puzzle",'Hemos resuelto el puzzle de la búsqueda de empleo'],
 body:["We've analyzed 20 million jobs for 150,000 users. Now we know what gets people hired. You benefit from proven job search strategies.",'Hemos analizado 20 millones de empleos para 150.000 usuarios. Ahora sabemos qué consigue que te contraten. Te beneficias de estrategias de búsqueda probadas.']},

/* -------- PHASE 6 · HOW WE HELP -------- */
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
{id:'P48',phase:6,type:'loader',title:['Matching you with remote jobs based on your profile','Emparejándote con empleos remotos según tu perfil']},
{id:'P49',phase:6,type:'result'},
{id:'P50',phase:6,type:'signup'},
{id:'P51',phase:6,type:'paywall'},
{id:'P52',phase:6,type:'success'}
];
const PLANS=[
  {name:['1 week','1 semana'], old:'24.99 €', day:'1.43', bill:['Billed 9.99 € per week, cancel anytime.','Se factura 9,99 € por semana, cancela cuando quieras.'], price:'9.99 €'},
  {name:['1 month','1 mes'], old:'49.99 €', day:'0.67', bill:['Billed 19.99 €/month, cancel anytime.','Se factura 19,99 €/mes, cancela cuando quieras.'], price:'19.99 €', popular:true},
  {name:['3 months','3 meses'], old:'99.99 €', day:'0.44', bill:['Billed 39.99 € every 3 months, cancel anytime.','Se factura 39,99 € cada 3 meses, cancela cuando quieras.'], price:'39.99 €'}
];
export { PHASES, PHASE_ICONS, EU, CDATA, COUNTRIES, flagOf, S as SCREENS, PLANS }

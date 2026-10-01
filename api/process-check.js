export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});

  const {name,company,email,phone,message,score,level,process,answers,privacy,fax=""}=req.body||{};
  if(!name||!company||!email||!privacy) return res.status(400).json({error:"Pflichtfelder fehlen"});

  const answerText=Array.isArray(answers)
    ? answers.map((item,index)=>`${index+1}. ${item.question}\nAntwort: ${item.answer}`).join("\n\n")
    : "";

  const leadMessage=[
    "Anfrage für einen kostenlosen Process Check über den Online First Effizienzcheck.",
    "",
    "EFFIZIENZCHECK",
    `Geprüfter Prozess: ${process||"Nicht angegeben"}`,
    `Ergebnis: ${score ?? "-"} / 23 Punkte`,
    `Automatisierungspotenzial: ${level||"Nicht angegeben"}`,
    "",
    "ANTWORTEN",
    answerText,
    message ? `\nOPTIONALE NACHRICHT\n${message}` : ""
  ].filter(Boolean).join("\n");

  try{
    const response=await fetch("https://founder-os-theta.vercel.app/api/public/online-first-lead",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        name,
        email,
        message:leadMessage,
        company_name:company||"",
        phone:phone||"",
        website:"",
        project_type:"Process Check / Prozessautomatisierung",
        budget:"",
        timeline:"",
        fax:fax||""
      })
    });

    const data=await response.json().catch(()=>({}));

    if(response.status===200 || response.status===201){
      return res.status(200).json({
        ok:true,
        lead_id:data.lead_id||null,
        duplicate:Boolean(data.duplicate)
      });
    }

    if(response.status===403) return res.status(502).json({error:"Die Website ist in Founder OS noch nicht als erlaubte Quelle freigeschaltet."});
    if(response.status===429) return res.status(429).json({error:"Zu viele Anfragen. Bitte versuche es später erneut."});
    return res.status(502).json({error:data.error||"Founder OS konnte die Anfrage nicht speichern."});
  }catch(e){
    return res.status(502).json({error:"Founder OS ist momentan nicht erreichbar."});
  }
}
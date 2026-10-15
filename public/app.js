"use strict";
/* ============================================================
   BookEasy — bilingual appointment system (single file)
   ============================================================ */

/* ---------------- i18n ---------------- */
const T = {
en:{
  bookTab:"Book", adminTab:"Manage", brandSub:"Appointment System",
  welcome:"Welcome to BookEasy", welcomeSub:"Salons, barbers, lawyers, doctors — one beautiful booking system for anyone who takes appointments.",
  getStarted:"Get started free", tryDemo:"Try demo", demoNote:"or explore with sample data",
  feat1t:"Set up in 2 minutes", feat1d:"Add your services, staff and working hours. Ready to take bookings instantly.",
  feat2t:"Beautiful booking page", feat2d:"Customers pick a service, staff member, date and time in a few taps.",
  feat3t:"Smart calendar & reminders", feat3d:"Track every appointment, send WhatsApp reminders and grow with reports.",
  offlineNote:"Free forever · Works offline · Your data stays in this browser",
  setupTitle:"Let's set up your business", setupTypeQ:"What type of business is it?",
  bizDetails:"Business details", bizName:"Business name", bizNamePh:"e.g. Glamour Salon",
  bizPhone:"Contact number", bizPhonePh:"07X XXX XXXX", bizAddr:"Address", bizAddrPh:"Street, City",
  bizAbout:"Short description", bizAboutPh:"Shown on your booking page",
  workingHours:"Working hours", sampleData:"Include sample bookings & customers",
  sampleDataHint:"Helps you explore every feature right away. You can delete them anytime.",
  step:"Step", allSet:"All set! 🎉", allSetSub:"Your booking system is ready. Share your booking page and start taking appointments.",
  openBooking:"Open booking page", goManage:"Go to manage panel",
  back:"Back", cont:"Continue", save:"Save", cancel:"Cancel", close:"Close", delete:"Delete", edit:"Edit",
  add:"Add", remove:"Remove", search:"Search", all:"All", actions:"Actions", view:"View", copy:"Copy", copied:"Copied!",
  yesDelete:"Yes, delete", keepIt:"Keep", submit:"Submit", done:"Done", skip:"Skip", reset:"Reset",
  ourServices:"Our services", ourTeam:"Our team", openingHours:"Opening hours", getInTouch:"Get in touch",
  reviewsTitle:"What customers say", basedOn:"Based on", reviews:"reviews", leaveReview:"Leave a review",
  noReviews:"No reviews yet — be the first!", avgRating:"Average rating",
  bookNow:"Book now", from:"from", highlyRated:"Highly rated", popularNow:"Popular right now",
  callUs:"Call", closedToday:"Closed today", opensAt:"Opens at",
  s1:"Choose a service", s2:"Choose staff", s3:"Choose date & time", s4:"Your details",
  noPref:"No preference", anyAvailable:"First available",
  pickDate:"Pick a date", availTimes:"Available times", noSlots:"No free slots on this day — please try another date.",
  yourName:"Your name", yourNamePh:"e.g. Nimal Perera", yourPhone:"Phone number", yourPhonePh:"07X XXX XXXX",
  notesOpt:"Notes (optional)", notesPh:"Anything we should know?",
  confirmBooking:"Confirm booking", pleaseService:"Please choose a service first.",
  pleaseStaff:"Please choose a staff member.", pleaseSlot:"Please pick a date and time.",
  fillName:"Please enter your name.", badPhone:"Please enter a valid phone number (9–10 digits).",
  booked:"Booking confirmed!", bookedSub:"We look forward to seeing you. Please arrive 5 minutes early.",
  refNo:"Booking reference", showOnArrival:"Show this number when you arrive.",
  sendWA:"Send via WhatsApp", sendSMS:"Send via SMS", copyDetails:"Copy details",
  bookAnother:"Book another", myBookings:"My bookings", findMine:"Find my bookings",
  enterPhone:"Enter the phone number you booked with:", noMine:"No bookings found for this number.",
  upcoming:"Upcoming", past:"Past", bookAgain:"Book again", cancelBooking:"Cancel booking",
  cancelQ:"Cancel this booking?", cancelQSub:"Are you sure you want to cancel this appointment?",
  cancelReason:"Reason for cancellation (optional)", confirmCancel:"Yes, cancel booking", keepBooking:"Keep booking",
  bookingCancelled:"Booking cancelled.", bookingUpdated:"Booking updated.", resched:"Reschedule",
  reschedTitle:"Reschedule booking", chooseNew:"Choose a new date & time", saveChanges:"Save changes",
  rateVisit:"How was your visit?", yourRating:"Your rating", commentOpt:"Comment (optional)",
  commentPh:"Tell us about your experience…", submitReview:"Submit review", thanksFeedback:"Thank you for your feedback!",
  alreadyReviewed:"Already reviewed", writeReview:"Write a review",
  hello:"Hello", apptConfirmedMsg:"Your appointment is confirmed ✅",
  waConfirm:"Hello {name}! Your appointment at {biz} is confirmed ✅\n📅 {date} at {time}\n💇 {service} with {staff}\n🔖 Ref: {ref}\nWe look forward to seeing you!",
  waRemind:"Hello {name}! Friendly reminder ⏰\nYour appointment at {biz} is tomorrow:\n📅 {date} at {time}\n💇 {service} with {staff}\n🔖 Ref: {ref}\nSee you soon!",
  // admin
  dash:"Dashboard", cal:"Calendar", appts:"Appointments", custs:"Customers", servs:"Services", staffT:"Staff", reps:"Reports", sett:"Settings",
  todayAppts:"Today's appointments", totalBookings:"Total bookings", totalCusts:"Total customers", monthRevenue:"Revenue this month",
  pendingAppts:"Pending approval", todaysSchedule:"Today's schedule", noApptsToday:"No appointments today. Enjoy the quiet! ☕",
  seeAll:"See all", upcomingAppts:"Upcoming appointments",
  newBooking:"New booking", quickBook:"Quick booking", bookFor:"Book for customer",
  fDate:"Date", fStatus:"Status", fStaff:"Staff", fService:"Service", fSearch:"Search name, phone or ref…",
  allStatuses:"All statuses", allStaff:"All staff", allServices:"All services",
  thCustomer:"Customer", thService:"Service", thStaff:"Staff", thDate:"Date", thTime:"Time", thStatus:"Status", thActions:"Actions", thRef:"Ref",
  pending:"Pending", confirmed:"Confirmed", completed:"Completed", cancelled:"Cancelled", noshow:"No-show",
  doConfirm:"Confirm", doComplete:"Complete", doCancel:"Cancel", doNoshow:"No-show", doRemind:"Remind", doResched:"Reschedule", doDelete:"Delete", doReview:"Reviews",
  statusUpdated:"Status updated.", newBookingDone:"New booking created.", remindSent:"Reminder opened in WhatsApp.",
  custSince:"Customer since", totalVisits:"Total visits", lastVisit:"Last visit", totalSpent:"Total spent", never:"—",
  history:"Booking history", addCust:"Add customer", editCust:"Edit customer", custName:"Customer name", custPhone:"Customer phone",
  custNotes:"Notes", custAdded:"Customer added.", custUpdated:"Customer updated.", custDeleted:"Customer deleted.",
  noCusts:"No customers yet.", noAppts:"No appointments found.",
  addService:"Add service", editService:"Edit service", svcName:"Service name", svcNamePh:"e.g. Haircut",
  priceRs:"Price (Rs)", durMin:"Duration (minutes)", category:"Category", active:"Active",
  svcAdded:"Service added.", svcUpdated:"Service updated.", svcDeleted:"Service deleted.",
  delSvcQ:"Delete this service?", delWarn:"This cannot be undone. Upcoming bookings for it will be cancelled.",
  noServs:"No services yet. Add your first service!",
  addStaff:"Add staff member", editStaff:"Edit staff member", staffName:"Full name", role:"Role / title", rolePh:"e.g. Senior Stylist",
  canDo:"Services they can do", daysOff:"Days off (dates)", addDate:"Add date",
  needOneSvc:"Please select at least one service.", staffAdded:"Staff member added.", staffUpdated:"Staff member updated.", staffDeleted:"Staff member deleted.",
  delStaffQ:"Delete this staff member?", noStaff:"No staff yet. Add your team!",
  hasBookingsWarn:"Cannot delete — this has upcoming bookings. It was deactivated instead.",
  rev14:"Revenue — last 14 days", topServs:"Most booked services", byBookings:"bookings", noData:"No data yet.",
  thisWeek:"This week", thisMonth:"This month",
  bizProfile:"Business profile", contactNo:"Contact number", address:"Address", shortDesc:"Short description",
  hoursTitle:"Working hours", dayOpen:"Open", fromT:"From", toT:"To", closedAllDay:"Closed",
  holidays:"Holidays & closures", addHoliday:"Add holiday", holName:"Holiday name", holNamePh:"e.g. Poya day", holDate:"Date",
  holAdded:"Holiday added.", holRemoved:"Holiday removed.",
  bufferLbl:"Buffer between bookings (minutes)", bufferHint:"Extra gap added after each appointment.",
  dataMgmt:"Data management", downloadBackup:"Download backup", restoreBackup:"Restore from backup",
  restoreWarn:"Warning: restoring replaces all current data.", startFresh:"Start fresh", eraseWarn:"This erases everything and restarts setup.",
  eraseQ:"Erase all data and start over?", settingsSaved:"Settings saved.",
  prev:"‹ Prev", next:"Next ›", goToday:"Today", noApptsDay:"No appointments on this day.",
  demoBanner:"You are viewing demo data.", resetDemo:"Reset demo",
  minUnit:"min", rsSym:"Rs", daysUnit:"days",
  delApptQ:"Delete this appointment?", apptDeleted:"Appointment deleted.",
  selectSvcFirst:"Select a service first.", chooseStaffFirst:"Choose staff to see times.",
  maxAhead:"Bookings can be made up to 60 days ahead.",
  invalidNum:"Please enter valid numbers.", fillRequired:"Please fill all required fields.",
  confirmDelete:"Are you sure?", cannotUndo:"This cannot be undone.",
  monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],
  monthShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  dayShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  bizTypes:{salon:"Salon",barber:"Barber Shop",lawyer:"Lawyer's Office",doctor:"Medical Clinic"},
},
si:{
  bookTab:"වෙන් කරන්න", adminTab:"කළමනාකරණය", brandSub:"හමුවීම් පද්ධතිය",
  welcome:"BookEasy වෙත සාදරයෙන් පිළිගනිමු", welcomeSub:"රූපලාවන්‍යාගාර, බාබර් සාප්පු, නීතිඥවරු, වෛද්‍යවරු — හමුවීම් භාරගන්නා ඕනෑම අයෙකුට එකම ලස්සන වෙන් කිරීමේ පද්ධතිය.",
  getStarted:"නොමිලේ පටන් ගන්න", tryDemo:"ආදර්ශනය බලන්න", demoNote:"නැතහොත් නියැදි දත්ත සමඟ අත්හදා බලන්න",
  feat1t:"විනාඩි 2න් සූදානම්", feat1d:"ඔබේ සේවාවන්, කාර්ය මණ්ඩලය සහ වැඩ කරන වේලාවන් එක් කරන්න. වහාම වෙන් කිරීම් භාරගන්න.",
  feat2t:"ආකර්ෂණීය වෙන් කිරීමේ පිටුව", feat2d:"ගනුදෙනුකරුවන්ට සේවාව, කාර්ය මණ්ඩලය, දිනය සහ වේලාව තෝරාගත හැක.",
  feat3t:"බුද්ධිමත් දින දර්ශනය සහ මතක් කිරීම්", feat3d:"සෑම හමුවීමක්ම නිරීක්ෂණය කරන්න, WhatsApp මතක් කිරීම් යවන්න, වාර්තා සමඟ වර්ධනය වන්න.",
  offlineNote:"සදහටම නොමිලේ · අන්තර්ජාලය නැතිව ක්‍රියා කරයි · දත්ත රැඳෙන්නේ මෙම බ්‍රවුසරයේමයි",
  setupTitle:"ඔබේ ව්‍යාපාරය සූදානම් කරමු", setupTypeQ:"ව්‍යාපාර වර්ගය කුමක්ද?",
  bizDetails:"ව්‍යාපාර විස්තර", bizName:"ව්‍යාපාරයේ නම", bizNamePh:"උදා: ග්ලැමර් රූපලාවන්‍යාගාරය",
  bizPhone:"ඇමතුම් අංකය", bizPhonePh:"07X XXX XXXX", bizAddr:"ලිපිනය", bizAddrPh:"වීදිය, නගරය",
  bizAbout:"කෙටි හැඳින්වීම", bizAboutPh:"වෙන් කිරීමේ පිටුවේ පෙන්වයි",
  workingHours:"වැඩ කරන වේලාවන්", sampleData:"නියැදි වෙන් කිරීම් සහ ගනුදෙනුකරුවන් ඇතුළත් කරන්න",
  sampleDataHint:"සියලු අංග වහාම අත්හදා බැලීමට උපකාරී වේ. ඕනෑම විටෙක මකා දැමිය හැක.",
  step:"පියවර", allSet:"සියල්ල සූදානම්! 🎉", allSetSub:"ඔබේ වෙන් කිරීමේ පද්ධතිය සූදානම්. වෙන් කිරීමේ පිටුව බෙදාගෙන හමුවීම් භාරගන්න.",
  openBooking:"වෙන් කිරීමේ පිටුව අරින්න", goManage:"කළමනාකරණ පුවරුවට",
  back:"ආපසු", cont:"ඉදිරියට", save:"සුරකින්න", cancel:"අවලංගු කරන්න", close:"වසන්න", delete:"මකන්න", edit:"සංස්කරණය",
  add:"එක් කරන්න", remove:"ඉවත් කරන්න", search:"සොයන්න", all:"සියල්ල", actions:"ක්‍රියාමාර්ග", view:"බලන්න", copy:"පිටපත් කරන්න", copied:"පිටපත් කළා!",
  yesDelete:"ඔව්, මකන්න", keepIt:"තබාගන්න", submit:"යවන්න", done:"හරි", skip:"මඟ හරින්න", reset:"යළි සකසන්න",
  ourServices:"අපේ සේවාවන්", ourTeam:"අපේ කණ්ඩායම", openingHours:"විවෘත වේලාවන්", getInTouch:"සම්බන්ධ වන්න",
  reviewsTitle:"ගනුදෙනුකරුවන් කියන දේ", basedOn:"අනුව", reviews:"ඇගයීම්", leaveReview:"ඇගයීමක් තබන්න",
  noReviews:"තවම ඇගයීම් නැත — පළමුවැන්නා වන්න!", avgRating:"සාමාන්‍ය ඇගයීම",
  bookNow:"දැන් වෙන් කරන්න", from:"සිට", highlyRated:"ඉහළ ඇගයීම් ලැබූ", popularNow:"දැන් ජනප්‍රිය",
  callUs:"අමතන්න", closedToday:"අද වසා ඇත", opensAt:"විවෘත වන්නේ",
  s1:"සේවාවක් තෝරන්න", s2:"කාර්ය මණ්ඩලය තෝරන්න", s3:"දිනය සහ වේලාව තෝරන්න", s4:"ඔබේ විස්තර",
  noPref:"කැමැත්තක් නැත", anyAvailable:"ලබා ගත හැකි පළමු අයා",
  pickDate:"දිනයක් තෝරන්න", availTimes:"ලබා ගත හැකි වේලාවන්", noSlots:"මෙම දිනට හිස් වේලාවන් නැත — වෙනත් දිනයක් උත්සාහ කරන්න.",
  yourName:"ඔබේ නම", yourNamePh:"උදා: නිමල් පෙරේරා", yourPhone:"දුරකථන අංකය", yourPhonePh:"07X XXX XXXX",
  notesOpt:"සටහන් (විකල්ප)", notesPh:"අප දැනගත යුතු යමක් තිබේද?",
  confirmBooking:"වෙන් කිරීම තහවුරු කරන්න", pleaseService:"කරුණාකර පළමුව සේවාවක් තෝරන්න.",
  pleaseStaff:"කරුණාකර කාර්ය මණ්ඩල සාමාජිකයෙක් තෝරන්න.", pleaseSlot:"කරුණාකර දිනය සහ වේලාව තෝරන්න.",
  fillName:"කරුණාකර ඔබේ නම ඇතුළත් කරන්න.", badPhone:"වලංගු දුරකථන අංකයක් ඇතුළත් කරන්න (ඉලක්කම් 9–10).",
  booked:"වෙන් කිරීම තහවුරුයි!", bookedSub:"ඔබව දැකීමට අපි බලාපොරොත්තු වෙමු. විනාඩි 5ක් කලින් පැමිණෙන්න.",
  refNo:"වෙන් කිරීමේ අංකය", showOnArrival:"පැමිණීමේදී මෙම අංකය පෙන්වන්න.",
  sendWA:"WhatsApp මගින් යවන්න", sendSMS:"SMS මගින් යවන්න", copyDetails:"විස්තර පිටපත් කරන්න",
  bookAnother:"තවත් වෙන් කිරීමක්", myBookings:"මගේ වෙන් කිරීම්", findMine:"මගේ වෙන් කිරීම් සොයන්න",
  enterPhone:"වෙන් කළ දුරකථන අංකය ඇතුළත් කරන්න:", noMine:"මෙම අංකයට වෙන් කිරීම් හමු නොවීය.",
  upcoming:"ඉදිරියේදී", past:"පසුගිය", bookAgain:"නැවත වෙන් කරන්න", cancelBooking:"වෙන් කිරීම අවලංගු කරන්න",
  cancelQ:"මෙම වෙන් කිරීම අවලංගු කරන්නද?", cancelQSub:"මෙම හමුවීම අවලංගු කිරීමට ඔබට විශ්වාසද?",
  cancelReason:"අවලංගු කිරීමට හේතුව (විකල්ප)", confirmCancel:"ඔව්, වෙන් කිරීම අවලංගු කරන්න", keepBooking:"වෙන් කිරීම තබාගන්න",
  bookingCancelled:"වෙන් කිරීම අවලංගු කළා.", bookingUpdated:"වෙන් කිරීම යාවත්කාලීන කළා.", resched:"නැවත යොදන්න",
  reschedTitle:"වෙන් කිරීම නැවත යොදන්න", chooseNew:"අලුත් දිනය සහ වේලාව තෝරන්න", saveChanges:"වෙනස්කම් සුරකින්න",
  rateVisit:"ඔබේ පැමිණීම කෙසේ වූවාද?", yourRating:"ඔබේ ඇගයීම", commentOpt:"අදහස (විකල්ප)",
  commentPh:"ඔබේ අත්දැකීම අපට කියන්න…", submitReview:"ඇගයීම යවන්න", thanksFeedback:"ඔබේ අදහසට ස්තූතියි!",
  alreadyReviewed:"දැනටමත් ඇගයුවා", writeReview:"ඇගයීමක් ලියන්න",
  hello:"ආයුබෝවන්", apptConfirmedMsg:"ඔබේ හමුවීම තහවුරුයි ✅",
  waConfirm:"ආයුබෝවන් {name}! {biz} හි ඔබේ හමුවීම තහවුරුයි ✅\n📅 {date} {time}\n💇 {service} — {staff} සමඟ\n🔖 අංකය: {ref}\nඔබව දැකීමට බලාපොරොත්තු වෙමු!",
  waRemind:"ආයුබෝවන් {name}! මතක් කිරීමක් ⏰\n{biz} හි ඔබේ හමුවීම හෙටයි:\n📅 {date} {time}\n💇 {service} — {staff} සමඟ\n🔖 අංකය: {ref}\nඉක්මණින් හමුවෙමු!",
  dash:"ඩෑෂ්බෝඩ්", cal:"දින දර්ශනය", appts:"හමුවීම්", custs:"ගනුදෙනුකරුවන්", servs:"සේවාවන්", staffT:"කාර්ය මණ්ඩලය", reps:"වාර්තා", sett:"සැකසුම්",
  todayAppts:"අද හමුවීම්", totalBookings:"මුළු වෙන් කිරීම්", totalCusts:"මුළු ගනුදෙනුකරුවන්", monthRevenue:"මේ මාසයේ ආදායම",
  pendingAppts:"අනුමැතිය අපේක්ෂිත", todaysSchedule:"අද කාලසටහන", noApptsToday:"අද හමුවීම් නැත. නිදහසේ ඉන්න! ☕",
  seeAll:"සියල්ල බලන්න", upcomingAppts:"ඉදිරි හමුවීම්",
  newBooking:"අලුත් වෙන් කිරීම", quickBook:"ඉක්මන් වෙන් කිරීම", bookFor:"ගනුදෙනුකරුට වෙන් කරන්න",
  fDate:"දිනය", fStatus:"තත්ත්වය", fStaff:"කාර්ය මණ්ඩලය", fService:"සේවාව", fSearch:"නම, දුරකථනය හෝ අංකය…",
  allStatuses:"සියලු තත්ත්ව", allStaff:"සියලු කාර්ය මණ්ඩලය", allServices:"සියලු සේවාවන්",
  thCustomer:"ගනුදෙනුකරු", thService:"සේවාව", thStaff:"කාර්ය මණ්ඩලය", thDate:"දිනය", thTime:"වේලාව", thStatus:"තත්ත්වය", thActions:"ක්‍රියාමාර්ග", thRef:"අංකය",
  pending:"අපේක්ෂිත", confirmed:"තහවුරු කළ", completed:"සම්පූර්ණ", cancelled:"අවලංගු කළ", noshow:"නොපැමිණි",
  doConfirm:"තහවුරු", doComplete:"සම්පූර්ණ", doCancel:"අවලංගු", doNoshow:"නොපැමිණි", doRemind:"මතක්", doResched:"නැවත යොදන්න", doDelete:"මකන්න", doReview:"ඇගයීම්",
  statusUpdated:"තත්ත්වය යාවත්කාලීන කළා.", newBookingDone:"අලුත් වෙන් කිරීමක් හැදුවා.", remindSent:"WhatsApp හි මතක් කිරීම විවෘත කළා.",
  custSince:"එක් වූ දිනය", totalVisits:"මුළු පැමිණීම්", lastVisit:"අවසන් පැමිණීම", totalSpent:"වියදම් කළ මුළු මුදල", never:"—",
  history:"වෙන් කිරීම් ඉතිහාසය", addCust:"ගනුදෙනුකරුවෙක් එක් කරන්න", editCust:"ගනුදෙනුකරු සංස්කරණය", custName:"ගනුදෙනුකරුගේ නම", custPhone:"ගනුදෙනුකරුගේ දුරකථනය",
  custNotes:"සටහන්", custAdded:"ගනුදෙනුකරු එක් කළා.", custUpdated:"ගනුදෙනුකරු යාවත්කාලීන කළා.", custDeleted:"ගනුදෙනුකරු මකා දැමුවා.",
  noCusts:"තවම ගනුදෙනුකරුවන් නැත.", noAppts:"හමුවීම් හමු නොවීය.",
  addService:"සේවාවක් එක් කරන්න", editService:"සේවාව සංස්කරණය", svcName:"සේවාවේ නම", svcNamePh:"උදා: කෙස් කැපීම",
  priceRs:"මිල (රු.)", durMin:"කාලය (විනාඩි)", category:"කාණ්ඩය", active:"සක්‍රීය",
  svcAdded:"සේවාව එක් කළා.", svcUpdated:"සේවාව යාවත්කාලීන කළා.", svcDeleted:"සේවාව මකා දැමුවා.",
  delSvcQ:"මෙම සේවාව මකන්නද?", delWarn:"මෙය ආපසු හැරවිය නොහැක. ඉදිරි වෙන් කිරීම් අවලංගු වේ.",
  noServs:"තවම සේවාවන් නැත. පළමු සේවාව එක් කරන්න!",
  addStaff:"සාමාජිකයෙක් එක් කරන්න", editStaff:"සාමාජිකයා සංස්කරණය", staffName:"සම්පූර්ණ නම", role:"තනතුර", rolePh:"උදා: ජ්‍යෙෂ්ඨ රූපලාවන්‍ය ශිල්පී",
  canDo:"ඔවුන්ට කළ හැකි සේවාවන්", daysOff:"නිවාඩු දින (දින)", addDate:"දිනය එක් කරන්න",
  needOneSvc:"අවම වශයෙන් සේවාවක් තෝරන්න.", staffAdded:"සාමාජිකයා එක් කළා.", staffUpdated:"සාමාජිකයා යාවත්කාලීන කළා.", staffDeleted:"සාමාජිකයා මකා දැමුවා.",
  delStaffQ:"මෙම සාමාජිකයා මකන්නද?", noStaff:"තවම කාර්ය මණ්ඩලය නැත. ඔබේ කණ්ඩායම එක් කරන්න!",
  hasBookingsWarn:"මකා දැමිය නොහැක — ඉදිරි වෙන් කිරීම් ඇත. ඒ වෙනුවට අක්‍රීය කළා.",
  rev14:"ආදායම — පසුගිය දින 14", topServs:"වැඩිපුරම වෙන් වූ සේවාවන්", byBookings:"වෙන් කිරීම්", noData:"තවම දත්ත නැත.",
  thisWeek:"මේ සතිය", thisMonth:"මේ මාසය",
  bizProfile:"ව්‍යාපාර පැතිකඩ", contactNo:"ඇමතුම් අංකය", address:"ලිපිනය", shortDesc:"කෙටි හැඳින්වීම",
  hoursTitle:"වැඩ කරන වේලාවන්", dayOpen:"විවෘතයි", fromT:"සිට", toT:"දක්වා", closedAllDay:"වසා ඇත",
  holidays:"නිවාඩු සහ වසා තැබීම්", addHoliday:"නිවාඩු දිනයක් එක් කරන්න", holName:"නිවාඩුවේ නම", holNamePh:"උදා: පෝය දිනය", holDate:"දිනය",
  holAdded:"නිවාඩු දිනය එක් කළා.", holRemoved:"නිවාඩු දිනය ඉවත් කළා.",
  bufferLbl:"වෙන් කිරීම් අතර පරතරය (විනාඩි)", bufferHint:"සෑම හමුවීමකටම පසුව එකතු වන අමතර කාලය.",
  dataMgmt:"දත්ත කළමනාකරණය", downloadBackup:"උපස්ථය බාගන්න", restoreBackup:"උපස්ථයෙන් යථා තත්ත්වයට",
  restoreWarn:"අවවාදයයි: යථා තත්ත්වයට පත් කිරීමේදී වත්මන් දත්ත සියල්ල ප්‍රතිස්ථාපනය වේ.", startFresh:"අලුතින් පටන් ගන්න", eraseWarn:"මෙය සියල්ල මකා දමා සැකසුම නැවත අරඹයි.",
  eraseQ:"සියලු දත්ත මකා අලුතින් පටන් ගන්නද?", settingsSaved:"සැකසුම් සුරැකුවා.",
  prev:"‹ පෙර", next:"ඊළඟ ›", goToday:"අද", noApptsDay:"මෙම දින හමුවීම් නැත.",
  demoBanner:"ඔබ බලන්නේ නියැදි දත්තයි.", resetDemo:"නියැදි යළි දමන්න",
  minUnit:"විනාඩි", rsSym:"රු.", daysUnit:"දින",
  delApptQ:"මෙම හමුවීම මකන්නද?", apptDeleted:"හමුවීම මකා දැමුවා.",
  selectSvcFirst:"පළමුව සේවාවක් තෝරන්න.", chooseStaffFirst:"වේලාවන් බැලීමට කාර්ය මණ්ඩලය තෝරන්න.",
  maxAhead:"උපරිම දින 60ක් ඉදිරියට වෙන් කළ හැක.",
  invalidNum:"වලංගු අංක ඇතුළත් කරන්න.", fillRequired:"අත්‍යවශ්‍ය සියලු ක්ෂේත්‍ර පුරවන්න.",
  confirmDelete:"ඔබට විශ්වාසද?", cannotUndo:"මෙය ආපසු හැරවිය නොහැක.",
  monthNames:["ජනවාරි","පෙබරවාරි","මාර්තු","අප්‍රේල්","මැයි","ජූනි","ජූලි","අගෝස්තු","සැප්තැම්බර්","ඔක්තෝබර්","නොවැම්බර්","දෙසැම්බර්"],
  monthShort:["ජන","පෙබ","මාර්","අප්‍රේ","මැයි","ජූනි","ජූලි","අගෝ","සැප්","ඔක්","නොවැ","දෙසැ"],
  dayNames:["ඉරිදා","සඳුදා","අඟහරුවාදා","බදාදා","බ්‍රහස්පතින්දා","සිකුරාදා","සෙනසුරාදා"],
  dayShort:["ඉරි","සඳු","අඟ","බදා","බ්‍රහ","සිකු","සෙන"],
  bizTypes:{salon:"රූපලාවන්‍යාගාරය",barber:"බාබර් සාප්පුව",lawyer:"නීතිඥ කාර්යාලය",doctor:"වෛද්‍ය සායනය"},
}};

let lang = localStorage.getItem('bk_lang') || 'si';
function t(k){ const v = (T[lang]&&T[lang][k]); return v!==undefined ? v : (T.en[k]!==undefined?T.en[k]:k); }
function tn(o){ if(!o) return ""; if(typeof o==="string") return o; return o[lang]||o.en||""; }
function setLang(l){ lang=l; localStorage.setItem('bk_lang',l); document.body.classList.toggle('si',l==='si'); applyLang(); render(); }
function applyLang(){
  document.getElementById('lang-en').classList.toggle('active',lang==='en');
  document.getElementById('lang-si').classList.toggle('active',lang==='si');
  document.querySelectorAll('[data-t]').forEach(el=>{ el.textContent=t(el.dataset.t); });
  document.getElementById('brand-sub').textContent=t('brandSub');
  document.getElementById('foot').textContent=t('offlineNote');
}

/* ---------------- utils ---------------- */
const $=s=>document.querySelector(s);
function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function uid(p){ return (p||'id')+'_'+Math.random().toString(36).slice(2,9); }
function pad(n){ return String(n).padStart(2,'0'); }
function dstr(d){ return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
function todayStr(){ return dstr(new Date()); }
function addDays(ds,n){ const d=new Date(ds+'T12:00:00'); d.setDate(d.getDate()+n); return dstr(d); }
function parseDS(ds){ return new Date(ds+'T12:00:00'); }
function fmtDate(ds){ const d=parseDS(ds); return t('dayNames')[d.getDay()]+', '+d.getDate()+' '+t('monthNames')[d.getMonth()]+' '+d.getFullYear(); }
function fmtDateS(ds){ const d=parseDS(ds); return d.getDate()+' '+t('monthShort')[d.getMonth()]; }
function fmtTime(min){ let h=Math.floor(min/60), m=min%60; const ap=h>=12?'PM':'AM'; h=h%12||12; return h+':'+pad(m)+' '+ap; }
function fmtMoney(n){ return t('rsSym')+' '+Number(n||0).toLocaleString('en-US'); }
function fmtDur(m){ return m+' '+t('minUnit'); }
function validPhone(p){ const d=String(p).replace(/\D/g,''); return d.length>=9&&d.length<=10; }
function toast(msg,ok){ const r=$('#toast-root'); const el=document.createElement('div'); el.className='toast'+(ok==='ok'?' ok':ok==='err'?' err':''); el.innerHTML=(ok==='ok'?'✅ ':ok==='err'?'⚠️ ':'')+esc(msg); r.appendChild(el); setTimeout(()=>{el.style.opacity='0';el.style.transition='.3s';setTimeout(()=>el.remove(),320);},2600); }
function openModal(html){ $('#modal-root').innerHTML='<div class="mback" onclick="if(event.target===this)closeModal()"><div class="modal">'+html+'</div></div>'; }
function closeModal(){ $('#modal-root').innerHTML=''; }
function confirmDlg(msg, onYes, yesLbl){
  openModal('<h3>'+esc(msg)+'</h3><p style="color:var(--muted);font-size:14px">'+esc(t('cannotUndo'))+'</p>'+
    '<div class="mrow"><button class="btn btn-g btn-sm" onclick="closeModal()">'+esc(t('keepIt'))+'</button>'+
    '<button class="btn btn-danger btn-sm" id="cf-yes">'+esc(yesLbl||t('yesDelete'))+'</button></div>');
  $('#cf-yes').onclick=()=>{ closeModal(); onYes(); };
}
function waLink(phone,msg){ const p=String(phone).replace(/\D/g,''); return 'https://wa.me/'+p+'?text='+encodeURIComponent(msg); }
function fillMsg(tpl,a){ return tpl.replace('{name}',a.name).replace('{biz}',a.biz).replace('{date}',a.date).replace('{time}',a.time).replace('{service}',a.service).replace('{staff}',a.staff).replace('{ref}',a.ref); }
function apptMsg(a,kind){ const db=DB.data; const c=getCustomer(a.customerId), s=getService(a.serviceId), st=getStaff(a.staffId);
  return fillMsg(t(kind==='remind'?'waRemind':'waConfirm'),{name:c?c.name:'',biz:db.business.name,date:fmtDate(a.date),time:fmtTime(a.start),service:tn(s&&s.name),staff:st?st.name:t('noPref'),ref:a.ref}); }
function download(name,content,type){ const b=new Blob([content],{type:type||'application/json'}); const u=URL.createObjectURL(b); const aEl=document.createElement('a'); aEl.href=u; aEl.download=name; aEl.click(); setTimeout(()=>URL.revokeObjectURL(u),2000); }

/* ---------------- business presets ---------------- */
const TYPE_ICON={salon:'💇',barber:'💈',lawyer:'⚖️',doctor:'🩺'};
const PRESETS={
salon:{icon:'💇',
  biz:{name:'Glamour Salon',phone:'0771234567',address:'123 Galle Road, Colombo 03',
    about:{en:'Premium salon for hair, skin & bridal — look your best, every day.',si:'කෙස්, සම සහ මනාලි සඳහා විශිෂ්ට රූපලාවන්‍යාගාරය — සෑම දිනකම ලස්සනට.'}},
  cats:[{en:'Hair',si:'කෙස්'},{en:'Skin',si:'සම'},{en:'Nails',si:'නිය'},{en:'Bridal',si:'මනාලි'}],
  services:[
    {n:{en:'Haircut & Styling',si:'කෙස් කැපීම හා මෝස්තර'},p:1500,d:45,c:0},
    {n:{en:'Hair Coloring',si:'කෙස් වර්ණ ගැන්වීම'},p:8500,d:120,c:0},
    {n:{en:'Hair Rebonding',si:'කෙස් රීබොන්ඩින්'},p:12000,d:150,c:0},
    {n:{en:'Facial Treatment',si:'මුහුණු ප්‍රතිකාරය'},p:4500,d:60,c:1},
    {n:{en:'Clean-up',si:'ක්ලීන්-අප්'},p:2500,d:30,c:1},
    {n:{en:'Manicure',si:'මැනිකියර්'},p:2500,d:45,c:2},
    {n:{en:'Pedicure',si:'පෙඩිකියර්'},p:3000,d:50,c:2},
    {n:{en:'Bridal Package',si:'මනාලි පැකේජය'},p:35000,d:240,c:3}],
  staff:[
    {n:'Nadeesha Perera',r:{en:'Senior Stylist',si:'ජ්‍යෙෂ්ඨ මෝස්තර ශිල්පිනිය'},s:[0,1,2]},
    {n:'Kamal Fernando',r:{en:'Beautician',si:'රූපලාවන්‍ය ශිල්පී'},s:[3,4,5,6]},
    {n:'Ishara Silva',r:{en:'Bridal Specialist',si:'මනාලි විශේෂඥ'},s:[0,3,7]}]},
barber:{icon:'💈',
  biz:{name:'Sharp Cutz Barber',phone:'0772345678',address:'45 Main Street, Nugegoda',
    about:{en:'Classic & modern cuts, hot-towel shaves and beard sculpting.',si:'සම්භාව්‍ය හා නවීන කෙස් කැපීම්, රැවුල සැකසීම.'}},
  cats:[{en:'Hair',si:'කෙස්'},{en:'Beard',si:'රැවුල'},{en:'Packages',si:'පැකේජ'}],
  services:[
    {n:{en:'Classic Haircut',si:'සම්භාව්‍ය කෙස් කැපීම'},p:800,d:30,c:0},
    {n:{en:'Skin Fade',si:'ස්කින් ෆේඩ්'},p:1200,d:40,c:0},
    {n:{en:'Kids Haircut',si:'ළමා කෙස් කැපීම'},p:600,d:25,c:0},
    {n:{en:'Beard Trim',si:'රැවුල කැපීම'},p:500,d:20,c:1},
    {n:{en:'Hot Towel Shave',si:'උණු තුවා රැවුල'},p:900,d:30,c:1},
    {n:{en:'Cut + Beard Combo',si:'කෙස් + රැවුල පැකේජය'},p:1200,d:50,c:2}],
  staff:[
    {n:'Sunil Jayasuriya',r:{en:'Master Barber',si:'ප්‍රධාන බාබර්'},s:[0,1,2,3,4,5]},
    {n:'Ruwan Dias',r:{en:'Barber',si:'බාබර්'},s:[0,2,3,5]}]},
lawyer:{icon:'⚖️',
  biz:{name:'De Silva Law Chambers',phone:'0773456789',address:'Level 5, 200 Union Place, Colombo 02',
    about:{en:'Trusted legal counsel — consultations, documentation & case representation.',si:'විශ්වාසනීය නීති උපදෙස් — උපදේශන, ලේඛන සහ නඩු නියෝජනය.'}},
  cats:[{en:'Consultation',si:'උපදේශනය'},{en:'Documentation',si:'ලේඛන'}],
  services:[
    {n:{en:'Initial Consultation',si:'මූලික උපදේශනය'},p:5000,d:30,c:0},
    {n:{en:'Case Discussion',si:'නඩු සාකච්ඡාව'},p:7500,d:45,c:0},
    {n:{en:'Document Review',si:'ලේඛන සමාලෝචනය'},p:8000,d:60,c:1},
    {n:{en:'Agreement Drafting',si:'ගිවිසුම් කෙටුම්පත්'},p:15000,d:90,c:1},
    {n:{en:'Notary Service',si:'නොතාරිස් සේවය'},p:2500,d:20,c:1}],
  staff:[
    {n:'Amal de Silva',r:{en:'Attorney-at-Law',si:'නීතිඥ'},s:[0,1,2,3,4]},
    {n:'Nethmini Rajapaksa',r:{en:'Junior Counsel',si:'කනිෂ්ඨ නීතිඥ'},s:[0,2,4]}]},
doctor:{icon:'🩺',
  biz:{name:'City Care Clinic',phone:'0774567890',address:'78 Hospital Road, Dehiwala',
    about:{en:'Caring medical consultations for the whole family.',si:'පවුලේ සැමටම සැලකිලිමත් වෛද්‍ය උපදේශන.'}},
  cats:[{en:'General',si:'සාමාන්‍ය'},{en:'Special',si:'විශේෂ'}],
  services:[
    {n:{en:'General Consultation',si:'සාමාන්‍ය පරීක්ෂාව'},p:2000,d:15,c:0},
    {n:{en:'Follow-up Visit',si:'නැවත පරීක්ෂාව'},p:1200,d:10,c:0},
    {n:{en:'Full Medical Checkup',si:'සම්පූර්ණ වෛද්‍ය පරීක්ෂාව'},p:7500,d:45,c:1},
    {n:{en:'Child Clinic',si:'ළමා සායනය'},p:2500,d:20,c:1},
    {n:{en:'ECG & Screening',si:'ECG පරීක්ෂාව'},p:3500,d:25,c:1}],
  staff:[
    {n:'Dr. Anuradha Senanayake',r:{en:'General Physician',si:'සාමාන්‍ය වෛද්‍ය'},s:[0,1,2,4]},
    {n:'Dr. Kasun Mendis',r:{en:'Pediatrician',si:'ළමා රෝග විශේෂඥ'},s:[0,1,3]}]}
};

/* ---------------- data layer ---------------- */
/* API client (web version: Postgres backend) */
const API={
  token:localStorage.getItem('bk_token')||null,
  ctoken:localStorage.getItem('bk_ctoken')||null,
  async req(path,opts){
    opts=opts||{};
    const headers=Object.assign({'Content-Type':'application/json'},opts.headers||{});
    if(path.indexOf('/api/admin')===0&&this.token) headers['Authorization']='Bearer '+this.token;
    if(path.indexOf('/api/me')===0&&this.ctoken) headers['Authorization']='Bearer '+this.ctoken;
    const r=await fetch(path,{method:opts.method||'GET',headers:headers,body:opts.body});
    const j=await r.json().catch(function(){return {};});
    if(!r.ok) throw new Error(j.error||('http-'+r.status));
    return j;
  }
};
const DB={
  data:null, isAdmin:false, exists:false,
  async load(){
    try{
      if(this.isAdmin&&API.token){ const r=await API.req('/api/admin/data'); this.data=r.data; this.exists=true; }
      else{ const r=await API.req('/api/public/data'); this.exists=!!r.exists; this.data=r.exists?r:null;
        if(this.data){ this.data.appointments=this.data.appointments||[]; this.data.customers=this.data.customers||[]; } }
    }catch(e){ this.data=null; }
    return this.data;
  },
  save(){
    if(!this.isAdmin||!API.token||!this.data) return;
    clearTimeout(this._st);
    this._st=setTimeout(function(){ DB.flush(); },400);
  },
  async flush(){
    if(!this.isAdmin||!API.token||!this.data) return;
    clearTimeout(this._st);
    try{ await API.req('/api/admin/data',{method:'PUT',body:JSON.stringify({data:this.data})}); }
    catch(e){ console.error('save failed',e); toast('save-failed','err'); }
  },
  seed(type,withSample){
    const P=PRESETS[type];
    const services=P.services.map((s,i)=>({id:uid('svc'),name:s.n,price:s.p,duration:s.d,cat:P.cats[s.c],active:true}));
    const staff=P.staff.map(m=>({id:uid('stf'),name:m.n,role:m.r,phone:'',services:m.s.map(i=>services[i].id),daysOff:[],active:true}));
    const hours={}; for(let d=0;d<7;d++) hours[d]= d===0?{closed:true}:{open:540,close:1140};
    this.data={ v:1, type, icon:P.icon,
      business:{name:P.biz.name,phone:P.biz.phone,address:P.biz.address,about:P.biz.about,hours,bufferMin:10,holidays:[]},
      services, staff, customers:[], appointments:[], reviews:[],
      seq:100 };
    if(withSample) seedSample();
  }
};
function getService(id){ return DB.data.services.find(s=>s.id===id); }
function getStaff(id){ return DB.data.staff.find(s=>s.id===id); }
function getCustomer(id){ return DB.data.customers.find(c=>c.id===id); }
function getAppt(id){ return DB.data.appointments.find(a=>a.id===id); }
function activeServices(){ return DB.data.services.filter(s=>s.active); }
function activeStaff(){ return DB.data.staff.filter(s=>s.active); }
function newRef(){ DB.data.seq=(DB.data.seq||100)+1; return 'BK-'+DB.data.seq.toString(36).toUpperCase().padStart(4,'0')+Math.random().toString(36).slice(2,4).toUpperCase(); }

function seedSample(){
  const names=['Nimal Perera','Kamala Fernando','Ruwan Jayasuriya','Dilhani Mendis','Ajith Kumara','Shiromi de Silva','Pradeep Rajapaksa','Nayana Wickramasinghe'];
  const phones=['0771112233','0772223344','0773334455','0774445566','0775556677','0776667788','0777778899','0778889900'];
  const custs=names.map((n,i)=>({id:uid('cus'),name:n,phone:phones[i],notes:'',createdAt:addDays(todayStr(),-30+i)}));
  DB.data.customers=custs;
  const svcs=DB.data.services, stf=DB.data.staff;
  const mk=(dOff,hh,mm,ci,si,status)=>{ const sv=svcs[ci%svcs.length], st=stf[si%stf.length];
    const start=hh*60+mm, end=start+sv.duration+(DB.data.business.bufferMin||0);
    const c=custs[Math.floor(Math.random()*custs.length)];
    DB.data.seq++; return {id:uid('apt'),ref:'BK-'+DB.data.seq.toString(36).toUpperCase().padStart(4,'0')+'X',
      customerId:c.id,serviceId:sv.id,staffId:st.id,date:addDays(todayStr(),dOff),start,end,status,notes:'',createdAt:addDays(todayStr(),dOff-1)}; };
  const A=[];
  A.push(mk(-1,10,0,0,0,'completed'),mk(-1,11,30,3,1,'completed'),mk(-1,15,0,1,0,'noshow'));
  A.push(mk(0,9,30,0,0,'confirmed'),mk(0,10,30,5,1,'confirmed'),mk(0,14,0,2,0,'pending'),mk(0,16,0,3,1,'pending'));
  A.push(mk(1,9,0,1,0,'pending'),mk(1,11,0,4,1,'confirmed'),mk(1,15,30,0,0,'pending'));
  A.push(mk(2,10,0,6,1,'confirmed'),mk(3,9,30,2,0,'pending'));
  DB.data.appointments=A;
  const done=A.filter(a=>a.status==='completed');
  const comments=[{en:'Excellent service, very friendly!',si:'ඉතා හොඳ සේවාවක්, ඉතා මිත්‍රශීලී!'},{en:'Clean place, on time. Highly recommended.',si:'පිරිසිදු තැනක්, වෙලාවට. අනිවාර්යයෙන්ම නිර්දේශ කරනවා.'}];
  DB.data.reviews=done.slice(0,2).map((a,i)=>({id:uid('rev'),appointmentId:a.id,rating:i===0?5:4,comment:comments[i],createdAt:a.date}));
}

/* ---------------- slot engine ---------------- */
function bizHoursFor(ds){
  const b=DB.data.business;
  if(b.holidays.some(h=>h.date===ds)) return null;
  const h=b.hours[parseDS(ds).getDay()];
  if(!h||h.closed) return null;
  return h;
}
function overlaps(aS,aE,bS,bE){ return aS<bE && bS<aE; }
function staffBusy(staffId,ds,ignoreId){
  return DB.data.appointments
    .filter(a=>a.staffId===staffId&&a.date===ds&&a.status!=='cancelled'&&a.id!==ignoreId)
    .map(a=>[a.start,a.end]);
}
function getSlots(ds,serviceId,staffId,ignoreId){
  const svc=getService(serviceId); if(!svc) return [];
  const h=bizHoursFor(ds); if(!h) return [];
  const dur=svc.duration+(DB.data.business.bufferMin||0);
  const step=15, out=[], seen={};
  const now=new Date(), isToday=ds===todayStr(), lead=now.getHours()*60+now.getMinutes()+30;
  let list = staffId==='any' ? activeStaff().filter(s=>s.services.includes(serviceId)) : [getStaff(staffId)].filter(Boolean);
  for(const st of list){
    if(!st||(st.daysOff||[]).includes(ds)) continue;
    const busy=staffBusy(st.id,ds,ignoreId);
    for(let s=h.open;s+dur<=h.close;s+=step){
      if(isToday&&s<lead) continue;
      const e=s+dur;
      if(busy.some(b=>overlaps(s,e,b[0],b[1]))) continue;
      if(staffId==='any'&&seen[s]) continue;
      seen[s]=1; out.push({start:s,staffId:st.id});
    }
  }
  return out.sort((a,b)=>a.start-b.start);
}
function slotFree(ds,start,serviceId,staffId,ignoreId){
  return getSlots(ds,serviceId,staffId,ignoreId).some(s=>s.start===start&&(staffId==='any'||s.staffId===staffId));
}
function custFindOrCreate(name,phone){
  const ph=String(phone).replace(/\D/g,'');
  let c=DB.data.customers.find(c=>c.phone.replace(/\D/g,'')===ph);
  if(!c){ c={id:uid('cus'),name,phone,notes:'',createdAt:todayStr()}; DB.data.customers.push(c); }
  else if(c.name!==name){ c.name=name; }
  return c;
}
function apptRevenue(a){ return (a.status==='completed'||a.status==='confirmed') ? (getService(a.serviceId)||{price:0}).price : 0; }

/* ---------------- router ---------------- */
let view='book', adminTab='dash', bookStep=1, setupStep=1, setupType='salon';
const BK={serviceId:null,staffId:null,date:null,start:null,slotStaff:null,name:'',phone:'',notes:''};
const F={apptDate:todayStr(),apptStatus:'all',apptStaff:'all',apptSvc:'all',apptQ:'',custQ:'',calMonth:null,calDay:todayStr()};
function go(v){ view=v; if(v==='book'){bookStep=1;resetBK();} window.scrollTo(0,0); render(); }
function resetBK(){ BK.serviceId=null;BK.staffId=null;BK.date=null;BK.start=null;BK.slotStaff=null;BK.name='';BK.phone='';BK.notes=''; }
async function render(){
  $('#tab-book').classList.toggle('active',view==='book');
  $('#tab-admin').classList.toggle('active',view==='admin');
  const app=$('#app');
  if(!DB.data){ app.innerHTML = (setupStep>0&&view==='setup') ? setupHTML() : landingHTML(); window.scrollTo(0,0); return; }
  if(view==='admin'&&!DB.isAdmin){ app.innerHTML=adminLoginHTML(); window.scrollTo(0,0); return; }
  app.innerHTML = view==='admin' ? adminHTML() : bookHTML();
  if(view==='admin'&&adminTab==='reps'){ drawRevChart(); loadSmsLog(); }
  window.scrollTo(0,0);
}
function initials(n){ return n.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase(); }

/* ---------------- landing & setup ---------------- */
function landingHTML(){
  return '<div class="hero salon" style="text-align:center;padding:60px 30px">'
  +'<div class="bicon">📅</div><h1>'+esc(t('welcome'))+'</h1><p style="margin:0 auto">'+esc(t('welcomeSub'))+'</p>'
  +'<div class="btnrow" style="justify-content:center;max-width:520px;margin:26px auto 0">'
  +'<button class="btn btn-p" onclick="view=\'setup\';setupStep=1;render()">🚀 '+esc(t('getStarted'))+'</button></div></div>'
  +'<div class="grid3">'
  +[['⚡','feat1t','feat1d'],['💅','feat2t','feat2d'],['🔔','feat3t','feat3d']].map(f=>
    '<div class="card" style="text-align:center"><div style="font-size:40px">'+f[0]+'</div><h3 style="margin:10px 0 6px">'+esc(t(f[1]))+'</h3><p style="color:var(--muted);font-size:14px;line-height:1.6">'+esc(t(f[2]))+'</p></div>').join('')
  +'</div>';
}
function setupHTML(){
  let body='';
  const wz='<div class="wzsteps"><div class="'+(setupStep>=1?'on':'')+'"></div><div class="'+(setupStep>=2?'on':'')+'"></div><div class="'+(setupStep>=3?'on':'')+'"></div></div>';
  if(setupStep===1){
    body='<h2 style="margin-bottom:6px">'+esc(t('setupTitle'))+'</h2><p style="color:var(--muted);margin-bottom:18px">'+esc(t('setupTypeQ'))+'</p>'
    +'<div class="grid4">'+Object.keys(PRESETS).map(k=>'<div class="typecard'+(setupType===k?' sel':'')+'" onclick="setupType=\''+k+'\';render()"><div class="ti">'+PRESETS[k].icon+'</div><div class="tt">'+esc(t('bizTypes')[k])+'</div></div>').join('')+'</div>'
    +'<div class="btnrow"><button class="btn btn-p" onclick="setupStep=2;render()">'+esc(t('cont'))+' →</button></div>';
  }else if(setupStep===2){
    const P=PRESETS[setupType];
    body='<h2 style="margin-bottom:18px">'+esc(t('bizDetails'))+'</h2><div class="card"><div class="grid2">'
    +'<div class="fgroup"><label>'+esc(t('bizName'))+' *</label><input id="su-name" value="'+esc(P.biz.name)+'" placeholder="'+esc(t('bizNamePh'))+'"></div>'
    +'<div class="fgroup"><label>'+esc(t('bizPhone'))+' *</label><input id="su-phone" value="'+esc(P.biz.phone)+'" placeholder="'+esc(t('bizPhonePh'))+'"></div></div>'
    +'<div class="fgroup"><label>'+esc(t('bizAddr'))+'</label><input id="su-addr" value="'+esc(P.biz.address)+'" placeholder="'+esc(t('bizAddrPh'))+'"></div>'
    +'<div class="fgroup"><label>'+esc(t('bizAbout'))+'</label><textarea id="su-about" rows="2" placeholder="'+esc(t('bizAboutPh'))+'">'+esc(tn(P.biz.about))+'</textarea></div>'
    +'<div class="fgroup"><label style="display:flex;gap:10px;align-items:center;cursor:pointer"><input type="checkbox" id="su-sample" checked style="width:20px;height:20px"> '+esc(t('sampleData'))+'</label><p class="hint">'+esc(t('sampleDataHint'))+'</p></div>'
    +'<div class="frow"><div class="fgroup"><label>🔐 '+esc(lang==='si'?'කළමනාකරණ මුරපදය':'Admin password')+' *</label><input id="su-pass" type="password" placeholder="••••••••"></div>'
    +'<div class="fgroup"><label>🔐 '+esc(lang==='si'?'නැවත මුරපදය':'Repeat password')+' *</label><input id="su-pass2" type="password" placeholder="••••••••"></div></div>'
    +'</div><div class="btnrow"><button class="btn btn-g" onclick="setupStep=1;render()">← '+esc(t('back'))+'</button><button class="btn btn-p" onclick="setupNext2()">'+esc(t('cont'))+' →</button></div>';
  }else if(setupStep===3){
    body='<h2 style="margin-bottom:18px">'+esc(t('workingHours'))+'</h2><div class="card">'+hoursEditorHTML('su')+'</div>'
    +'<div class="btnrow"><button class="btn btn-g" onclick="setupStep=2;render()">← '+esc(t('back'))+'</button><button class="btn btn-p" onclick="finishSetup()">🎉 '+esc(t('allSet'))+'</button></div>';
  }else{
    body='<div class="card success"><div class="big">🎉</div><h2>'+esc(t('allSet'))+'</h2><p style="color:var(--muted);margin:8px 0 6px">'+esc(t('allSetSub'))+'</p>'
    +'<div class="btnrow" style="justify-content:center;max-width:560px;margin:22px auto 0"><button class="btn btn-p" onclick="go(\'book\')">🗓️ '+esc(t('openBooking'))+'</button><button class="btn btn-g" onclick="go(\'admin\')">⚙️ '+esc(t('goManage'))+'</button></div></div>';
  }
  return '<div style="max-width:760px;margin:0 auto">'+wz+body+'</div>';
}
function setupNext2(){
  const n=$('#su-name').value.trim(), p=$('#su-phone').value.trim();
  if(!n||!p){ toast(t('fillRequired'),'err'); return; }
  const pw1=$('#su-pass').value, pw2=$('#su-pass2').value;
  if(pw1.length<4||pw1!==pw2){ toast(lang==='si'?'මුරපදය අවම අක්ෂර 4ක් විය යුතු අතර දෙකම සමාන විය යුතුයි':'Password must be 4+ characters and match','err'); return; }
  window._su={name:n,phone:p,addr:$('#su-addr').value.trim(),about:$('#su-about').value.trim(),sample:$('#su-sample').checked,pass:pw1};
  setupStep=3; render();
}
async function finishSetup(){
  try{
    DB.seed(setupType, window._su?window._su.sample:true);
    const b=DB.data.business;
    if(window._su){ b.name=window._su.name; b.phone=window._su.phone; b.address=window._su.addr; b.about={en:window._su.about,si:window._su.about}; }
    if($('#su-h0o')) b.hours=readHoursEditor('su');
    const r=await API.req('/api/setup',{method:'POST',body:JSON.stringify({data:DB.data,adminPassword:window._su.pass})});
    API.token=r.token; localStorage.setItem('bk_token',r.token);
    DB.isAdmin=true; await DB.load();
    setupStep=4; view='book'; render();
  }catch(e){ toast(e.message==='already-setup'?(lang==='si'?'දැනටමත් සැකසී ඇත':'Already set up'):e.message,'err'); }
}
/* hours editor (shared by setup & settings) */
function defHours(){ const h={}; for(let d=0;d<7;d++) h[d]=d===0?{closed:true}:{open:540,close:1140}; return h; }
function hoursEditorHTML(pfx,hours){
  hours=hours||defHours();
  let h='';
  for(let d=0;d<7;d++){ const hh=hours[d]||{closed:true};
    h+='<div class="hoursrow"><b>'+esc(t('dayNames')[d])+'</b>'
    +'<span><span class="hint">'+esc(t('fromT'))+' </span><input type="time" id="'+pfx+'-h'+d+'o" value="'+(hh.closed?'09:00':pad(Math.floor(hh.open/60))+':'+pad(hh.open%60))+'" '+(hh.closed?'disabled':'')+'></span>'
    +'<span><span class="hint">'+esc(t('toT'))+' </span><input type="time" id="'+pfx+'-h'+d+'c" value="'+(hh.closed?'19:00':pad(Math.floor(hh.close/60))+':'+pad(hh.close%60))+'" '+(hh.closed?'disabled':'')+'></span>'
    +'<label class="switch"><input type="checkbox" '+(hh.closed?'':'checked')+' onchange="toggleDay(\''+pfx+'\','+d+',this.checked)"><span class="sl"></span></label></div>';
  }
  return h;
}
function toggleDay(pfx,d,on){
  $('#'+pfx+'-h'+d+'o').disabled=!on; $('#'+pfx+'-h'+d+'c').disabled=!on;
}
function readHoursEditor(pfx){
  const h={};
  for(let d=0;d<7;d++){ const el=$('#'+pfx+'-h'+d+'o'); const on=el&&!el.disabled;
    if(!on){ h[d]={closed:true}; continue; }
    const o=$('#'+pfx+'-h'+d+'o').value.split(':'), c=$('#'+pfx+'-h'+d+'c').value.split(':');
    h[d]={open:(+o[0])*60+(+o[1]),close:(+c[0])*60+(+c[1])};
  }
  return h;
}
function fmtRange(h){ return fmtTime(h.open)+' – '+fmtTime(h.close); }

/* ---------------- customer booking site ---------------- */
function bookHTML(){
  const b=DB.data.business, ic=DB.data.icon||'📅';
  const dw=new Date().getDay(), todayH=b.hours[dw];
  const isHol=b.holidays.some(x=>x.date===todayStr());
  const openLbl = isHol||!todayH||todayH.closed ? t('closedToday') : t('opensAt')+' '+fmtTime(todayH.open);
  let h='<div class="hero '+DB.data.type+'"><div class="bicon">'+ic+'</div><h1>'+esc(b.name)+'</h1><p>'+esc(tn(b.about))+'</p>'
    +'<div class="meta"><span>📞 '+esc(b.phone)+'</span><span>📍 '+esc(b.address)+'</span><span>🕘 '+esc(openLbl)+'</span></div></div>';
  h+=bookingWidgetHTML();
  h+='<div style="height:26px"></div>'+infoSectionsHTML();
  return h;
}
function bookingWidgetHTML(){
  const steps=[t('s1'),t('s2'),t('s3'),t('s4')];
  let h='<div class="card" id="bookcard" style="border-top:4px solid var(--primary)"><div class="secttl"><h2>🗓️ '+esc(t('bookNow'))+'</h2>'
    +'<button class="btn btn-g btn-sm" onclick="myBookingsDlg()">🔎 '+esc(t('myBookings'))+'</button></div>';
  h+='<div class="steps">'+steps.map((s,i)=>'<div class="step'+(bookStep===i+1?' now':'')+(bookStep>i+1?' done':'')+'"><span class="n">'+(bookStep>i+1?'✓':(i+1))+'</span>'+esc(s)+'</div>').join('')+'</div>';
  h+='<div id="bstep">'+bookStepHTML()+'</div></div>';
  return h;
}
function bookStepHTML(){
  if(bookStep===1){
    const svcs=activeServices();
    if(!svcs.length) return '<div class="empty"><div class="e">💈</div>'+esc(t('noServs'))+'</div>';
    const cats={}; svcs.forEach(s=>{const c=tn(s.cat); (cats[c]=cats[c]||[]).push(s);});
    let h='';
    for(const c in cats){ h+='<h4 style="margin:16px 0 10px;color:var(--muted)">'+esc(c)+'</h4><div class="optgrid">'
      +cats[c].map(s=>'<div class="opt'+(BK.serviceId===s.id?' sel':'')+'" onclick="pickService(\''+s.id+'\')"><div class="t">'+esc(tn(s.name))+'</div>'
      +'<div class="p"><span class="price">'+esc(fmtMoney(s.price))+'</span><span class="dur">⏱ '+esc(fmtDur(s.duration))+'</span></div></div>').join('')+'</div>'; }
    return h;
  }
  if(bookStep===2){
    const svc=getService(BK.serviceId);
    const list=activeStaff().filter(s=>s.services.includes(BK.serviceId));
    let h='<div class="optgrid">';
    h+='<div class="opt'+(BK.staffId==='any'?' sel':'')+'" onclick="pickStaff(\'any\')"><div class="avatar">👥</div><div class="t">'+esc(t('noPref'))+'</div><div class="d">'+esc(t('anyAvailable'))+'</div></div>';
    h+=list.map(s=>'<div class="opt'+(BK.staffId===s.id?' sel':'')+'" onclick="pickStaff(\''+s.id+'\')"><div class="avatar">'+esc(initials(s.name))+'</div><div class="t">'+esc(s.name)+'</div><div class="d">'+esc(tn(s.role))+'</div></div>').join('')+'</div>';
    if(!list.length) h='<div class="empty"><div class="e">👤</div>'+esc(t('noStaff'))+'</div>';
    h+='<div class="btnrow"><button class="btn btn-g" onclick="bookStep=1;render()">← '+esc(t('back'))+'</button></div>';
    return h;
  }
  if(bookStep===3){
    let h='<h4 style="margin-bottom:10px">'+esc(t('pickDate'))+'</h4><div class="datestrip">';
    for(let i=0;i<14;i++){ const ds=addDays(todayStr(),i), d=parseDS(ds), open=!!bizHoursFor(ds);
      h+='<div class="datecell'+(BK.date===ds?' sel':'')+(open?'':' dis')+'"'+(open?' onclick="pickDate(\''+ds+'\')"':'')+'><div class="dw">'+esc(t('dayShort')[d.getDay()])+'</div><div class="dn">'+d.getDate()+'</div><div class="dm">'+esc(t('monthShort')[d.getMonth()])+'</div></div>'; }
    h+='</div>';
    if(BK.date){
      const slots=window._pubSlots;
      h+='<h4 style="margin:14px 0 10px">'+esc(t('availTimes'))+' · '+esc(fmtDate(BK.date))+'</h4>';
      if(!slots) h+='<div class="empty" style="padding:18px">…</div>';
      else h+= slots.length? '<div class="slotgrid">'+slots.map(s=>'<button class="slot'+(BK.start===s.start?' sel':'')+'" onclick="pickSlot('+s.start+',\''+s.staffId+'\')">'+esc(fmtTime(s.start))+'</button>').join('')+'</div>'
        : '<div class="empty"><div class="e">🕘</div>'+esc(t('noSlots'))+'</div>';
    }
    h+='<div class="btnrow"><button class="btn btn-g" onclick="bookStep=2;render()">← '+esc(t('back'))+'</button>'
      +'<button class="btn btn-p" '+(BK.start==null?'disabled':'')+' onclick="toStep4()">'+esc(t('cont'))+' →</button></div>';
    return h;
  }
  // step 4
  const svc=getService(BK.serviceId), st=BK.slotStaff?getStaff(BK.slotStaff):(BK.staffId&&BK.staffId!=='any'?getStaff(BK.staffId):null);
  let h='<div class="grid2"><div>'
    +'<div class="fgroup"><label>'+esc(t('yourName'))+' *</label><input id="bk-name" value="'+esc(BK.name)+'" placeholder="'+esc(t('yourNamePh'))+'"></div>'
    +'<div class="fgroup"><label>'+esc(t('yourPhone'))+' *</label><input id="bk-phone" value="'+esc(BK.phone)+'" placeholder="'+esc(t('yourPhonePh'))+'" inputmode="tel"></div>'
    +'<div class="fgroup"><label>'+esc(t('notesOpt'))+'</label><textarea id="bk-notes" rows="2" placeholder="'+esc(t('notesPh'))+'">'+esc(BK.notes)+'</textarea></div></div>'
    +'<div><div class="card" style="background:#faf8f3"><h4 style="margin-bottom:8px">📋 '+esc(t('s4'))+'</h4>'
    +sumRow(t('thService'),esc(tn(svc.name)))+sumRow(t('thStaff'),esc(st?st.name:t('noPref')))
    +sumRow(t('thDate'),esc(fmtDate(BK.date)))+sumRow(t('thTime'),esc(fmtTime(BK.start)))
    +sumRow(t('durMin'),esc(fmtDur(svc.duration)))
    +'<div class="sumrow"><span class="k">'+esc(t('priceRs'))+'</span><b style="color:var(--primary);font-size:18px">'+esc(fmtMoney(svc.price))+'</b></div>'
    +'</div></div></div>'
    +'<div class="btnrow"><button class="btn btn-g" onclick="bookStep=3;render()">← '+esc(t('back'))+'</button><button class="btn btn-p" onclick="confirmBooking()">✅ '+esc(t('confirmBooking'))+'</button></div>';
  return h;
}
function sumRow(k,v){ return '<div class="sumrow"><span class="k">'+esc(k)+'</span><b>'+v+'</b></div>'; }
function pickService(id){ BK.serviceId=id; BK.staffId=null; BK.date=null; BK.start=null; window._pubSlots=null; bookStep=2; render(); document.getElementById('bookcard').scrollIntoView({behavior:'smooth'}); }
function pickStaff(id){ BK.staffId=id; BK.date=null; BK.start=null; window._pubSlots=null; bookStep=3; render(); document.getElementById('bookcard').scrollIntoView({behavior:'smooth'}); }
async function pickDate(ds){
  BK.date=ds; BK.start=null; BK.slotStaff=null; window._pubSlots=null; render();
  try{
    const q=await API.req('/api/public/slots?serviceId='+encodeURIComponent(BK.serviceId)+'&staffId='+encodeURIComponent(BK.staffId||'any')+'&date='+ds);
    if(BK.date===ds){ window._pubSlots=q.slots; render(); }
  }catch(e){ if(BK.date===ds){ window._pubSlots=[]; render(); } }
}
function pickSlot(start,staffId){ BK.start=start; BK.slotStaff=staffId; render(); }
function toStep4(){ if(BK.start==null){toast(t('pleaseSlot'),'err');return;} bookStep=4; render(); document.getElementById('bookcard').scrollIntoView({behavior:'smooth'}); }
async function confirmBooking(){
  BK.name=$('#bk-name').value.trim(); BK.phone=$('#bk-phone').value.trim(); BK.notes=$('#bk-notes').value.trim();
  if(!BK.name){ toast(t('fillName'),'err'); return; }
  if(!validPhone(BK.phone)){ toast(t('badPhone'),'err'); return; }
  const staffId=BK.staffId==='any'?BK.slotStaff:BK.staffId;
  try{
    const r=await API.req('/api/public/book',{method:'POST',body:JSON.stringify({serviceId:BK.serviceId,staffId:staffId,date:BK.date,start:BK.start,name:BK.name,phone:BK.phone,notes:BK.notes,lang:lang})});
    DB.data.appointments=DB.data.appointments||[]; DB.data.customers=DB.data.customers||[];
    DB.data.appointments.push(r.booking);
    if(!DB.data.customers.some(c=>c.id===r.booking.customerId)) DB.data.customers.push({id:r.booking.customerId,name:r.customer.name,phone:r.customer.phone,notes:'',createdAt:r.booking.date});
    successHTML(r.booking);
  }catch(e){
    if(e.message==='slot-taken'){ toast(t('noSlots'),'err'); bookStep=3; render(); }
    else toast(e.message,'err');
  }
}
function successHTML(a){
  const b=DB.data.business, c=getCustomer(a.customerId), s=getService(a.serviceId), st=getStaff(a.staffId);
  const msg=apptMsg(a,'confirm');
  window._copyMsg=msg;
  $('#bstep').innerHTML='<div class="success"><div class="big">✅</div><h2>'+esc(t('booked'))+'</h2><p style="color:var(--muted)">'+esc(t('bookedSub'))+'</p>'
  +'<div class="refbox"><div class="rl">'+esc(t('refNo'))+'</div><div class="rv">'+esc(a.ref)+'</div><div class="hint">'+esc(t('showOnArrival'))+'</div></div>'
  +'<div class="card" style="max-width:440px;margin:0 auto;text-align:left">'
  +sumRow(t('thService'),esc(tn(s.name)))+sumRow(t('thStaff'),esc(st?st.name:t('noPref')))+sumRow(t('thDate'),esc(fmtDate(a.date)))+sumRow(t('thTime'),esc(fmtTime(a.start)))+sumRow(t('thCustomer'),esc(c.name+' · '+c.phone))
  +'</div><div class="btnrow" style="justify-content:center;max-width:640px;margin:20px auto 0">'
  +'<a class="btn btn-wa" target="_blank" href="'+waLink(b.phone,msg)+'">💬 '+esc(t('sendWA'))+'</a>'
  +'<a class="btn btn-g" href="sms:'+esc(b.phone.replace(/\D/g,''))+'?body='+encodeURIComponent(msg)+'">✉️ '+esc(t('sendSMS'))+'</a>'
  +'<button class="btn btn-g" onclick="navigator.clipboard.writeText(window._copyMsg);toast(t(\'copied\'),\'ok\')">📋 '+esc(t('copyDetails'))+'</button>'
  +'<button class="btn btn-p" onclick="resetBK();bookStep=1;render()">＋ '+esc(t('bookAnother'))+'</button></div></div>';
  document.getElementById('bookcard').scrollIntoView({behavior:'smooth'});
  toast(t('booked'),'ok');
}
function infoSectionsHTML(){
  const b=DB.data.business;
  const revs=DB.data.reviews.slice().reverse();
  const avg=revs.length?(revs.reduce((x,r)=>x+r.rating,0)/revs.length):0;
  let h='<div class="grid2">';
  h+='<div class="card"><h3>👥 '+esc(t('ourTeam'))+'</h3>'+activeStaff().map(s=>'<div class="kv"><div class="avatar" style="width:40px;height:40px;font-size:15px;margin:0">'+esc(initials(s.name))+'</div><div><b>'+esc(s.name)+'</b><div class="hint" style="margin:0">'+esc(tn(s.role))+'</div></div></div>').join('')+'</div>';
  h+='<div class="card"><h3>🕘 '+esc(t('openingHours'))+'</h3>';
  for(let d=1;d<7;d++){ const hh=b.hours[d]; h+='<div class="sumrow"><span class="k">'+esc(t('dayNames')[d])+'</span><b>'+(hh.closed?esc(t('closedAllDay')):esc(fmtRange(hh)))+'</b></div>'; }
  const s0=b.hours[0]; h+='<div class="sumrow"><span class="k">'+esc(t('dayNames')[0])+'</span><b>'+(s0.closed?esc(t('closedAllDay')):esc(fmtRange(s0)))+'</b></div>';
  if(b.holidays.length) h+='<div style="margin-top:10px">'+b.holidays.map(x=>'<span class="chip">🚫 '+esc(fmtDateS(x.date))+' '+esc(x.name)+'</span>').join('')+'</div>';
  h+='</div></div>';
  h+='<div class="card" style="margin-top:18px"><div class="secttl"><h3>⭐ '+esc(t('reviewsTitle'))+'</h3>'+(revs.length?'<span class="chip">'+avg.toFixed(1)+' ★ · '+revs.length+' '+esc(t('reviews'))+'</span>':'')+'</div>';
  h+= revs.length? revs.slice(0,3).map(r=>{const a=getAppt(r.appointmentId),c=a&&getCustomer(a.customerId);
    return '<div style="border-bottom:1px solid var(--line);padding:10px 0"><b>'+'★'.repeat(r.rating)+'<span style="color:#ddd5c2">'+'★'.repeat(5-r.rating)+'</span></b> <span style="color:var(--muted);font-size:13px">— '+esc(c?c.name:'')+'</span><div style="margin-top:4px">'+esc(tn(r.comment))+'</div></div>';}).join('')
    : '<div class="empty"><div class="e">⭐</div>'+esc(t('noReviews'))+'</div>';
  h+='</div>';
  h+='<div class="card" style="margin-top:18px"><h3>📞 '+esc(t('getInTouch'))+'</h3><div class="kv">📞 '+esc(b.phone)+'</div><div class="kv">📍 '+esc(b.address)+'</div></div>';
  return h;
}
/* my bookings */
function myBookingsDlg(){
  if(API.ctoken){ myBookingsList(); return; }
  openModal('<h3>🔎 '+esc(t('findMine'))+'</h3><p style="color:var(--muted);font-size:14px;margin-bottom:10px">'+esc(t('enterPhone'))+'</p>'
  +'<div class="fgroup"><input id="mb-phone" inputmode="tel" placeholder="'+esc(t('yourPhonePh'))+'"></div>'
  +'<div id="mb-otpwrap" style="display:none"><div class="fgroup"><label>'+esc(lang==='si'?'SMS කේතය (OTP)':'SMS code (OTP)')+'</label><input id="mb-code" inputmode="numeric" maxlength="6" placeholder="••••••"></div>'
  +'<p class="hint">'+esc(lang==='si'?'කේතය ඔබේ දුරකථනයට SMS කරන ලදී':'A code was sent to your phone via SMS')+'</p></div>'
  +'<div class="mrow"><button class="btn btn-g btn-sm" onclick="closeModal()">'+esc(t('close'))+'</button>'
  +'<button class="btn btn-p btn-sm" id="mb-go" onclick="mbRequestOtp()">'+esc(lang==='si'?'කේතය එවන්න':'Send code')+'</button></div>');
}
async function mbRequestOtp(){
  const ph=$('#mb-phone').value;
  try{
    await API.req('/api/otp/request',{method:'POST',body:JSON.stringify({phone:ph,lang:lang})});
    window._mbPhone=ph;
    $('#mb-otpwrap').style.display='block';
    const go=$('#mb-go'); go.textContent=lang==='si'?'තහවුරු කරන්න':'Verify'; go.onclick=mbVerifyOtp;
    toast(lang==='si'?'කේතය SMS කරන ලදී':'Code sent via SMS','ok');
  }catch(e){ toast(e.message==='too-many'?(lang==='si'?'බොහෝ උත්සාහයන් — පසුව උත්සාහ කරන්න':'Too many attempts — try later'):t('badPhone'),'err'); }
}
async function mbVerifyOtp(){
  try{
    const r=await API.req('/api/otp/verify',{method:'POST',body:JSON.stringify({phone:window._mbPhone,code:$('#mb-code').value})});
    API.ctoken=r.token; localStorage.setItem('bk_ctoken',r.token); localStorage.setItem('bk_cphone',r.phone);
    myBookingsList();
  }catch(e){ toast(lang==='si'?'කේතය වැරදියි':'Wrong code','err'); }
}
function mbLogout(){ API.ctoken=null; localStorage.removeItem('bk_ctoken'); localStorage.removeItem('bk_cphone'); closeModal(); }
async function myBookingsList(){
  openModal('<h3>🔎 '+esc(t('myBookings'))+'</h3><div id="mb-list"><div class="empty">…</div></div>'
  +'<div class="mrow"><button class="btn btn-g btn-sm" onclick="mbLogout()">'+esc(lang==='si'?'ඉවත් වන්න':'Log out')+'</button>'
  +'<button class="btn btn-g btn-sm" onclick="closeModal()">'+esc(t('close'))+'</button></div>');
  let list=[];
  try{ const r=await API.req('/api/me/bookings'); list=r.bookings; }
  catch(e){ API.ctoken=null; localStorage.removeItem('bk_ctoken'); myBookingsDlg(); return; }
  const now=todayStr();
  $('#mb-list').innerHTML = list.length? list.map(a=>{
    const future=a.date>=now&&!['cancelled','completed','noshow'].includes(a.status);
    const canReview=a.status==='completed'&&!a.reviewed;
    return '<div class="card" style="margin:10px 0;padding:14px"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><b>'+esc(a.service)+'</b><span class="pill '+a.status+'">'+esc(t(a.status==='noshow'?'noshow':a.status))+'</span></div>'
    +'<div class="hint">📅 '+esc(fmtDate(a.date))+' · '+esc(fmtTime(a.start))+' · '+esc(a.staff)+' · 🔖 '+esc(a.ref)+'</div>'
    +'<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">'
    +(future?'<button class="iconbtn" onclick="reschedDlg(\''+a.id+'\',true)">🔁 '+esc(t('resched'))+'</button><button class="iconbtn danger" onclick="cancelDlg(\''+a.id+'\',true)">✖ '+esc(t('cancelBooking'))+'</button>':'')
    +(canReview?'<button class="iconbtn" onclick="reviewDlg(\''+a.id+'\',true)">⭐ '+esc(t('writeReview'))+'</button>':'')
    +'</div></div>';
  }).join('') : '<div class="empty">'+esc(t('noMine'))+'</div>';
}
function cancelDlg(id,fromMine){
  const a=getAppt(id); if(!a) return;
  openModal('<h3>'+esc(t('cancelQ'))+'</h3><p style="color:var(--muted);font-size:14px;margin-bottom:10px">'+esc(t('cancelQSub'))+'</p>'
  +'<div class="fgroup"><label>'+esc(t('cancelReason'))+'</label><input id="cx-reason" placeholder="…"></div>'
  +'<div class="mrow"><button class="btn btn-g btn-sm" onclick="closeModal()">'+esc(t('keepBooking'))+'</button>'
  +'<button class="btn btn-danger btn-sm" onclick="doCancelAppt(\''+id+'\','+!!fromMine+')">'+esc(t('confirmCancel'))+'</button></div>');
}
async function doCancelAppt(id,fromMine){
  if(fromMine){
    try{ await API.req('/api/me/bookings/'+id+'/cancel',{method:'POST'}); closeModal(); toast(t('bookingCancelled'),'ok'); myBookingsList(); }
    catch(e){ closeModal(); toast(e.message,'err'); }
    return;
  }
  const a=getAppt(id); a.status='cancelled'; a.notes=(a.notes?a.notes+' | ':'')+($('#cx-reason')?$('#cx-reason').value:'');
  DB.save(); closeModal(); toast(t('bookingCancelled'),'ok'); render();
}
async function reschedDlg(id,fromMine){
  if(fromMine){
    let b=null;
    try{ const r=await API.req('/api/me/bookings'); b=r.bookings.find(x=>x.id===id); }catch(e){}
    if(!b){ toast('not-found','err'); return; }
    window._rs={id,fromMine:true,apiMode:true,date:b.date,start:null,slotStaff:null,serviceId:b.serviceId,staffId:b.staffId};
  }else{
    const a=getAppt(id); if(!a) return;
    window._rs={id,fromMine:false,apiMode:false,date:a.date,start:null,slotStaff:null};
  }
  openModal('<h3>🔁 '+esc(t('reschedTitle'))+'</h3><p style="color:var(--muted);font-size:14px;margin-bottom:8px">'+esc(t('chooseNew'))+'</p>'
  +'<div class="datestrip" id="rs-dates"></div><div id="rs-slots" style="margin-top:10px"></div>'
  +'<div class="mrow"><button class="btn btn-g btn-sm" onclick="closeModal()">'+esc(t('close'))+'</button>'
  +'<button class="btn btn-p btn-sm" id="rs-go" disabled onclick="doResched()">'+esc(t('saveChanges'))+'</button></div>');
  renderRsDates();
}
function renderRsDates(){
  const r=window._rs;
  let h='';
  for(let i=0;i<21;i++){ const ds=addDays(todayStr(),i), d=parseDS(ds), open=!!bizHoursFor(ds);
    h+='<div class="datecell'+(r.date===ds?' sel':'')+(open?'':' dis')+'"'+(open?' onclick="rsPickDate(\''+ds+'\')"':'')+'><div class="dw">'+esc(t('dayShort')[d.getDay()])+'</div><div class="dn">'+d.getDate()+'</div><div class="dm">'+esc(t('monthShort')[d.getMonth()])+'</div></div>'; }
  $('#rs-dates').innerHTML=h; renderRsSlots();
}
function rsPickDate(ds){ window._rs.date=ds; window._rs.start=null; renderRsDates(); }
async function renderRsSlots(){
  const r=window._rs;
  let slots;
  if(r.apiMode){
    try{ const q=await API.req('/api/public/slots?serviceId='+encodeURIComponent(r.serviceId)+'&staffId='+encodeURIComponent(r.staffId)+'&date='+r.date); slots=q.slots; }
    catch(e){ slots=[]; }
  }else{
    const a=getAppt(r.id);
    slots=getSlots(r.date,a.serviceId,a.staffId,r.id);
  }
  $('#rs-slots').innerHTML = slots.length? '<div class="slotgrid">'+slots.map(s=>'<button class="slot'+(r.start===s.start?' sel':'')+'" onclick="rsPickSlot('+s.start+',\''+s.staffId+'\')">'+esc(fmtTime(s.start))+'</button>').join('')+'</div>'
    : '<div class="empty" style="padding:16px">'+esc(t('noSlots'))+'</div>';
  const go=$('#rs-go'); if(go) go.disabled = r.start==null;
}
function rsPickSlot(start,staffId){ window._rs.start=start; window._rs.slotStaff=staffId; renderRsSlots(); }
async function doResched(){
  const r=window._rs;
  if(r.apiMode){
    try{
      await API.req('/api/me/bookings/'+r.id+'/reschedule',{method:'POST',body:JSON.stringify({date:r.date,start:r.start})});
      closeModal(); toast(t('bookingUpdated'),'ok'); myBookingsList();
    }catch(e){ toast(e.message==='slot-taken'?t('noSlots'):e.message,'err'); }
    return;
  }
  const a=getAppt(r.id), svc=getService(a.serviceId);
  try{
    await API.req('/api/admin/appointments/'+r.id,{method:'PATCH',body:JSON.stringify({date:r.date,start:r.start})});
  }catch(e){ toast(e.message==='slot-taken'?t('noSlots'):e.message,'err'); return; }
  a.date=r.date; a.start=r.start; a.end=r.start+svc.duration+(DB.data.business.bufferMin||0); a.status='pending';
  await DB.flush(); closeModal(); toast(t('bookingUpdated'),'ok'); render();
}
function reviewDlg(apptId,fromMine){
  window._rv={apptId,fromMine,stars:5};
  openModal('<h3>⭐ '+esc(t('rateVisit'))+'</h3><div class="stars" id="rv-stars">'+starHTML(5)+'</div>'
  +'<div class="fgroup" style="margin-top:12px"><label>'+esc(t('commentOpt'))+'</label><textarea id="rv-comment" rows="3" placeholder="'+esc(t('commentPh'))+'"></textarea></div>'
  +'<div class="mrow"><button class="btn btn-g btn-sm" onclick="closeModal()">'+esc(t('close'))+'</button>'
  +'<button class="btn btn-p btn-sm" onclick="doReview()">'+esc(t('submitReview'))+'</button></div>');
  bindStars();
}
function starHTML(n){ let h=''; for(let i=1;i<=5;i++) h+='<span data-s="'+i+'" class="'+(i<=n?'on':'off')+'">★</span>'; return h; }
function bindStars(){ document.querySelectorAll('#rv-stars span').forEach(sp=>{ sp.onclick=()=>{ window._rv.stars=+sp.dataset.s; $('#rv-stars').innerHTML=starHTML(window._rv.stars); bindStars(); }; }); }
async function doReview(){
  const r=window._rv;
  if(r.fromMine){
    try{
      await API.req('/api/public/review',{method:'POST',body:JSON.stringify({appointmentId:r.apptId,phone:localStorage.getItem('bk_cphone')||'',rating:r.stars,comment:$('#rv-comment').value.trim()})});
      closeModal(); toast(t('thanksFeedback'),'ok'); myBookingsList();
    }catch(e){ toast(e.message,'err'); }
    return;
  }
  DB.data.reviews.push({id:uid('rev'),appointmentId:r.apptId,rating:r.stars,comment:{en:$('#rv-comment').value.trim(),si:$('#rv-comment').value.trim()},createdAt:todayStr()});
  DB.save(); closeModal(); toast(t('thanksFeedback'),'ok');
  render();
}

/* ---------------- admin shell ---------------- */
function adminLoginHTML(){
  return '<div style="max-width:420px;margin:40px auto"><div class="card" style="text-align:center">'
  +'<div style="font-size:44px">🔐</div><h2 style="margin:10px 0 6px">'+esc(t('adminTab'))+'</h2>'
  +'<p style="color:var(--muted);font-size:14px;margin-bottom:14px">'+esc(lang==='si'?'කළමනාකරණ පුවරුවට පිවිසීමට මුරපදය ඇතුළත් කරන්න':'Enter your password to open the manage panel')+'</p>'
  +'<div class="fgroup" style="text-align:left"><input id="al-pass" type="password" placeholder="••••••••" onkeydown="if(event.key===\'Enter\')doAdminLogin()"></div>'
  +'<button class="btn btn-p" style="width:100%" onclick="doAdminLogin()">'+esc(lang==='si'?'ඇතුළු වන්න':'Log in')+'</button>'
  +'<p class="hint" style="margin-top:10px;cursor:pointer" onclick="go(\'book\')">← '+esc(t('bookTab'))+'</p></div></div>';
}
async function doAdminLogin(){
  const pw=$('#al-pass').value;
  try{
    const r=await API.req('/api/admin/login',{method:'POST',body:JSON.stringify({password:pw})});
    API.token=r.token; localStorage.setItem('bk_token',r.token);
    DB.isAdmin=true; await DB.load(); adminTab='dash'; render();
    toast(t('booked'),'ok');
  }catch(e){ toast(lang==='si'?'මුරපදය වැරදියි':'Wrong password','err'); }
}
async function adminLogout(){
  try{ await API.req('/api/admin/logout',{method:'POST'}); }catch(e){}
  API.token=null; localStorage.removeItem('bk_token'); DB.isAdmin=false; DB.data=null;
  await DB.load(); go('book');
}
function adminHTML(){
  const tabs=[['dash','📊'],['cal','🗓️'],['appts','📋'],['custs','👥'],['servs','✂️'],['staffT','🧑‍💼'],['reps','📈'],['sett','⚙️']];
  let h='<div class="admin"><div class="sidebar">'+tabs.map(x=>'<button class="'+(adminTab===x[0]?'active':'')+'" onclick="adminTab=\''+x[0]+'\';render()"><span class="ic">'+x[1]+'</span>'+esc(t(x[0]))+'</button>').join('')
  +'<button onclick="adminLogout()" style="color:var(--danger)"><span class="ic">🚪</span>'+esc(lang==='si'?'ඉවත් වන්න':'Log out')+'</button></div>';
  h+='<div id="admin-body">'+adminBodyHTML()+'</div></div>';
  return h;
}
function adminBodyHTML(){
  if(adminTab==='dash') return dashHTML();
  if(adminTab==='cal') return calHTML();
  if(adminTab==='appts') return apptsHTML();
  if(adminTab==='custs') return custsHTML();
  if(adminTab==='servs') return servsHTML();
  if(adminTab==='staffT') return staffHTML();
  if(adminTab==='reps') return repsHTML();
  return settHTML();
}
function pill(st){ return '<span class="pill '+st+'">'+esc(t(st==='noshow'?'noshow':st))+'</span>'; }
function custLine(a){ const c=getCustomer(a.customerId); return c?esc(c.name)+'<div class="hint" style="margin:0">'+esc(c.phone)+'</div>':'—'; }
function custName(a){ const c=getCustomer(a.customerId); return c?c.name:''; }

/* ---------------- dashboard ---------------- */
function dashHTML(){
  const A=DB.data.appointments, td=todayStr(), ym=td.slice(0,7);
  const todayA=A.filter(a=>a.date===td&&a.status!=='cancelled').sort((a,b)=>a.start-b.start);
  const pend=A.filter(a=>a.status==='pending').length;
  const rev=A.filter(a=>a.date.slice(0,7)===ym).reduce((x,a)=>x+apptRevenue(a),0);
  const up=A.filter(a=>(a.date>td||(a.date===td))&&['pending','confirmed'].includes(a.status)).sort((a,b)=>(a.date+pad(a.start)).localeCompare(b.date+pad(b.start))).slice(0,6);
  let h='<div class="secttl"><h2>📊 '+esc(t('dash'))+'</h2><button class="btn btn-p btn-sm" onclick="quickBookDlg()">＋ '+esc(t('newBooking'))+'</button></div>';
  h+='<div class="grid4">'
    +statCard('c1','🗓️',todayA.length,t('todayAppts'))
    +statCard('c2','⏳',pend,t('pendingAppts'))
    +statCard('c3','💰',fmtMoney(rev),t('monthRevenue'))
    +statCard('c4','👥',DB.data.customers.length,t('totalCusts'))
    +'</div>';
  h+='<div class="grid2" style="margin-top:18px"><div class="card"><div class="secttl"><h3>🕘 '+esc(t('todaysSchedule'))+'</h3><button class="iconbtn" onclick="adminTab=\'appts\';F.apptDate=\''+td+'\';render()">'+esc(t('seeAll'))+' →</button></div>'
    +(todayA.length? todayA.map(a=>{const s=getService(a.serviceId),st=getStaff(a.staffId);
      return '<div class="sumrow"><span class="k"><b style="color:var(--ink)">'+esc(fmtTime(a.start))+'</b> · '+esc(tn(s.name))+'<div class="hint" style="margin:0">'+esc(custName(a))+(st?' · '+esc(st.name):'')+'</div></span><span>'+pill(a.status)+(a.status==='pending'?' <button class="iconbtn" onclick="setStatus(\''+a.id+'\',\'confirmed\')">✓</button>':'')+'</span></div>';}).join('')
      :'<div class="empty"><div class="e">☕</div>'+esc(t('noApptsToday'))+'</div>')
    +'</div>';
  h+='<div class="card"><h3>⏭️ '+esc(t('upcomingAppts'))+'</h3>'
    +(up.length? up.map(a=>{const s=getService(a.serviceId);
      return '<div class="sumrow"><span class="k">'+esc(fmtDateS(a.date))+' · '+esc(fmtTime(a.start))+' — '+esc(tn(s.name))+'</span>'+pill(a.status)+'</div>';}).join('')
      :'<div class="empty"><div class="e">📭</div>'+esc(t('noAppts'))+'</div>')
    +'</div></div>';
  return h;
}
function statCard(cls,ic,val,lbl){ return '<div class="stat '+cls+'"><span class="ic">'+ic+'</span><div class="l">'+esc(lbl)+'</div><div class="v">'+esc(String(val))+'</div></div>'; }

/* ---------------- calendar ---------------- */
function calHTML(){
  if(!F.calMonth) F.calMonth=todayStr().slice(0,7);
  const [Y,M]=F.calMonth.split('-').map(Number);
  const first=new Date(Y,M-1,1), startDay=first.getDay(), days=new Date(Y,M,0).getDate();
  const prevM=pad(M-1||12), prevY=M===1?Y-1:Y, nextM=pad(M%12+1), nextY=M===12?Y+1:Y;
  let h='<div class="secttl"><h2>🗓️ '+esc(t('cal'))+'</h2><div style="display:flex;gap:8px;align-items:center">'
    +'<button class="iconbtn" onclick="F.calMonth=\''+prevY+'-'+prevM+'\';render()">'+esc(t('prev'))+'</button>'
    +'<b>'+esc(t('monthNames')[M-1])+' '+Y+'</b>'
    +'<button class="iconbtn" onclick="F.calMonth=\''+nextY+'-'+nextM+'\';render()">'+esc(t('next'))+'</button>'
    +'<button class="iconbtn" onclick="F.calMonth=null;F.calDay=todayStr();render()">'+esc(t('goToday'))+'</button></div></div>';
  h+='<div class="grid2" style="grid-template-columns:1.6fr 1fr"><div class="card"><div class="calgrid">'
    +t('dayShort').map(d=>'<div class="dow">'+esc(d)+'</div>').join('');
  for(let i=0;i<startDay;i++) h+='<div class="cday other"></div>';
  for(let d=1;d<=days;d++){
    const ds=Y+'-'+pad(M)+'-'+pad(d);
    const list=DB.data.appointments.filter(a=>a.date===ds&&a.status!=='cancelled');
    const dots=list.slice(0,6).map(a=>'<span class="dot '+a.status+'"></span>').join('');
    h+='<div class="cday'+(ds===F.calDay?' sel':'')+(ds===todayStr()?' today':'')+'" onclick="F.calDay=\''+ds+'\';render()"><div class="dnum">'+d+'</div><div class="dots">'+dots+'</div>'+(list.length?'<div class="cnt">'+list.length+' 📋</div>':'')+'</div>';
  }
  h+='</div></div>';
  const dayList=DB.data.appointments.filter(a=>a.date===F.calDay).sort((a,b)=>a.start-b.start);
  h+='<div class="card"><h3>'+esc(fmtDate(F.calDay))+'</h3>'
    +(dayList.length? dayList.map(a=>apptRowMini(a)).join('') : '<div class="empty"><div class="e">📭</div>'+esc(t('noApptsDay'))+'</div>')
    +'<button class="btn btn-p btn-sm" style="margin-top:12px" onclick="quickBookDlg(\''+F.calDay+'\')">＋ '+esc(t('newBooking'))+'</button></div></div>';
  return h;
}
function apptRowMini(a){
  const s=getService(a.serviceId),st=getStaff(a.staffId),c=getCustomer(a.customerId);
  return '<div class="sumrow"><span class="k"><b style="color:var(--ink)">'+esc(fmtTime(a.start))+'</b> · '+esc(tn(s.name))+'<div class="hint" style="margin:0">'+esc(c?c.name:'')+(st?' · '+esc(st.name):'')+' · 🔖'+esc(a.ref)+'</div></span><span>'+pill(a.status)+'</span></div>';
}

/* ---------------- appointments ---------------- */
function apptsHTML(){
  let h='<div class="secttl"><h2>📋 '+esc(t('appts'))+'</h2><button class="btn btn-p btn-sm" onclick="quickBookDlg()">＋ '+esc(t('newBooking'))+'</button></div>';
  h+='<div class="toolbar"><input type="date" id="f-date" value="'+esc(F.apptDate)+'" onchange="F.apptDate=this.value;render()">'
    +'<select id="f-st" onchange="F.apptStatus=this.value;render()">'+['all','pending','confirmed','completed','cancelled','noshow'].map(s=>'<option value="'+s+'"'+(F.apptStatus===s?' selected':'')+'>'+(s==='all'?esc(t('allStatuses')):esc(t(s==='noshow'?'noshow':s)))+'</option>').join('')+'</select>'
    +'<select onchange="F.apptStaff=this.value;render()"><option value="all">'+esc(t('allStaff'))+'</option>'+activeStaff().map(s=>'<option value="'+s.id+'"'+(F.apptStaff===s.id?' selected':'')+'>'+esc(s.name)+'</option>').join('')+'</select>'
    +'<select onchange="F.apptSvc=this.value;render()"><option value="all">'+esc(t('allServices'))+'</option>'+activeServices().map(s=>'<option value="'+s.id+'"'+(F.apptSvc===s.id?' selected':'')+'>'+esc(tn(s.name))+'</option>').join('')+'</select>'
    +'<input class="searchbox" placeholder="'+esc(t('fSearch'))+'" value="'+esc(F.apptQ)+'" oninput="F.apptQ=this.value;renderTbl()">'
    +'<button class="iconbtn" onclick="F.apptDate=\'\';F.apptStatus=\'all\';F.apptStaff=\'all\';F.apptSvc=\'all\';F.apptQ=\'\';render()">'+esc(t('reset'))+'</button></div>';
  h+='<div id="appt-tbl">'+apptTableHTML()+'</div>';
  return h;
}
function apptFiltered(){
  const q=F.apptQ.trim().toLowerCase();
  return DB.data.appointments.filter(a=>{
    if(F.apptDate&&a.date!==F.apptDate) return false;
    if(F.apptStatus!=='all'&&a.status!==F.apptStatus) return false;
    if(F.apptStaff!=='all'&&a.staffId!==F.apptStaff) return false;
    if(F.apptSvc!=='all'&&a.serviceId!==F.apptSvc) return false;
    if(q){ const c=getCustomer(a.customerId),s=getService(a.serviceId);
      const hay=((c?c.name+' '+c.phone:'')+' '+tn(s)+' '+a.ref).toLowerCase();
      if(!hay.includes(q)) return false; }
    return true;
  }).sort((a,b)=>((b.date+pad(b.start)).localeCompare(a.date+pad(a.start))));
}
function renderTbl(){ $('#appt-tbl').innerHTML=apptTableHTML(); }
function apptTableHTML(){
  const list=apptFiltered();
  if(!list.length) return '<div class="card"><div class="empty"><div class="e">📭</div>'+esc(t('noAppts'))+'</div></div>';
  let h='<div class="tblwrap"><table><tr><th>'+esc(t('thRef'))+'</th><th>'+esc(t('thCustomer'))+'</th><th>'+esc(t('thService'))+'</th><th>'+esc(t('thStaff'))+'</th><th>'+esc(t('thDate'))+'</th><th>'+esc(t('thStatus'))+'</th><th>'+esc(t('thActions'))+'</th></tr>';
  h+=list.slice(0,200).map(a=>{const s=getService(a.serviceId),st=getStaff(a.staffId);
    const acts=[];
    if(a.status==='pending') acts.push('<button class="iconbtn" title="'+esc(t('doConfirm'))+'" onclick="setStatus(\''+a.id+'\',\'confirmed\')">✅</button>');
    if(a.status==='confirmed'){ acts.push('<button class="iconbtn" title="'+esc(t('doComplete'))+'" onclick="setStatus(\''+a.id+'\',\'completed\')">🏁</button>'); acts.push('<button class="iconbtn" title="'+esc(t('doNoshow'))+'" onclick="setStatus(\''+a.id+'\',\'noshow\')">🚫</button>'); }
    if(['pending','confirmed'].includes(a.status)){ acts.push('<button class="iconbtn" title="'+esc(t('doRemind'))+'" onclick="remindAppt(\''+a.id+'\')">💬</button>'); acts.push('<button class="iconbtn" title="'+esc(t('doResched'))+'" onclick="reschedDlg(\''+a.id+'\',false)">🔁</button>'); }
    acts.push('<button class="iconbtn danger" title="'+esc(t('doDelete'))+'" onclick="delAppt(\''+a.id+'\')">🗑</button>');
    return '<tr><td><b>'+esc(a.ref)+'</b></td><td>'+custLine(a)+'</td><td>'+esc(tn(s.name))+'<div class="hint" style="margin:0">'+esc(fmtMoney(s.price))+'</div></td><td>'+esc(st?st.name:'—')+'</td><td>'+esc(fmtDateS(a.date))+'<div class="hint" style="margin:0">'+esc(fmtTime(a.start))+'</div></td><td>'+pill(a.status)+'</td><td style="white-space:nowrap">'+acts.join('')+'</td></tr>';
  }).join('')+'</table></div>';
  if(list.length>200) h+='<p class="hint" style="margin-top:8px">… '+list.length+' total</p>';
  return h;
}
async function setStatus(id,st){
  const a=getAppt(id); if(!a) return;
  const prev=a.status; a.status=st; render();
  try{ await API.req('/api/admin/appointments/'+id,{method:'PATCH',body:JSON.stringify({status:st})}); toast(t('statusUpdated'),'ok'); }
  catch(e){ a.status=prev; toast(e.message,'err'); }
  await DB.flush(); render();
}
function delAppt(id){ confirmDlg(t('delApptQ'),async function(){ try{ await API.req('/api/admin/appointments/'+id,{method:'DELETE'}); }catch(e){} DB.data.appointments=DB.data.appointments.filter(a=>a.id!==id); await DB.flush(); toast(t('apptDeleted'),'ok'); render(); }); }
function remindAppt(id){ const a=getAppt(id),c=getCustomer(a.customerId); if(!a||!c) return; window.open(waLink(c.phone,apptMsg(a,'remind')),'_blank'); toast(t('remindSent'),'ok'); }
/* quick booking (admin) */
function quickBookDlg(preDate){
  const svcs=activeServices();
  window._qb={svc:svcs.length?svcs[0].id:null,staff:'any',date:preDate||todayStr(),start:null,slotStaff:null,name:'',phone:'',notes:''};
  openModal('<h3>⚡ '+esc(t('quickBook'))+'</h3><div id="qb-body"></div><div class="mrow"><button class="btn btn-g btn-sm" onclick="closeModal()">'+esc(t('cancel'))+'</button><button class="btn btn-p btn-sm" id="qb-go" disabled onclick="doQuickBook()">✅ '+esc(t('confirmBooking'))+'</button></div>');
  renderQb();
}
function qbSet(k,v){ window._qb[k]=v; if(k==='svc'){window._qb.staff='any';} if(k==='date'||k==='svc'||k==='staff'){window._qb.start=null;} renderQb(); }
function renderQb(){
  const q=window._qb, svcs=activeServices();
  const staffList=q.svc?activeStaff().filter(s=>s.services.includes(q.svc)):[];
  let h='<div class="frow"><div class="fgroup"><label>'+esc(t('thService'))+'</label><select onchange="qbSet(\'svc\',this.value)">'+svcs.map(s=>'<option value="'+s.id+'"'+(q.svc===s.id?' selected':'')+'>'+esc(tn(s.name))+' · '+esc(fmtMoney(s.price))+'</option>').join('')+'</select></div>'
  +'<div class="fgroup"><label>'+esc(t('thStaff'))+'</label><select onchange="qbSet(\'staff\',this.value)"><option value="any"'+(q.staff==='any'?' selected':'')+'>'+esc(t('noPref'))+'</option>'+staffList.map(s=>'<option value="'+s.id+'"'+(q.staff===s.id?' selected':'')+'>'+esc(s.name)+'</option>').join('')+'</select></div></div>'
  +'<div class="fgroup"><label>'+esc(t('thDate'))+'</label><input type="date" value="'+esc(q.date)+'" min="'+todayStr()+'" max="'+addDays(todayStr(),60)+'" onchange="qbSet(\'date\',this.value)"></div>';
  if(q.svc&&q.date){
    const slots=getSlots(q.date,q.svc,q.staff);
    h+= slots.length? '<div class="slotgrid" style="margin-bottom:6px">'+slots.map(s2=>'<button class="slot'+(q.start===s2.start?' sel':'')+'" onclick="window._qb.start='+s2.start+';window._qb.slotStaff=\''+s2.staffId+'\';renderQb()">'+esc(fmtTime(s2.start))+(q.staff==='any'?'<div style="font-size:10px;font-weight:600;opacity:.75">'+esc((getStaff(s2.staffId)||{name:''}).name.split(' ')[0])+'</div>':'')+'</button>').join('')+'</div>'
      : '<div class="empty" style="padding:14px">'+esc(t('noSlots'))+'</div>';
  }
  h+='<div class="frow"><div class="fgroup"><label>'+esc(t('custName'))+' *</label><input id="qb-name" value="'+esc(q.name)+'" oninput="window._qb.name=this.value"></div>'
  +'<div class="fgroup"><label>'+esc(t('custPhone'))+' *</label><input id="qb-phone" value="'+esc(q.phone)+'" inputmode="tel" oninput="window._qb.phone=this.value"></div></div>'
  +'<div class="fgroup"><label>'+esc(t('notesOpt'))+'</label><input id="qb-notes" value="'+esc(q.notes)+'" oninput="window._qb.notes=this.value"></div>';
  $('#qb-body').innerHTML=h;
  $('#qb-go').disabled = !(q.svc&&q.start!=null&&q.name.trim()&&validPhone(q.phone));
}
async function doQuickBook(){
  const q=window._qb;
  const staffId=q.staff==='any'?q.slotStaff:q.staff;
  try{
    const r=await API.req('/api/admin/appointments',{method:'POST',body:JSON.stringify({serviceId:q.svc,staffId:staffId,date:q.date,start:q.start,name:q.name.trim(),phone:q.phone.trim(),notes:q.notes.trim()})});
    DB.data.appointments.push(r.booking);
    if(!getCustomer(r.booking.customerId)) DB.data.customers.push({id:r.booking.customerId,name:q.name.trim(),phone:q.phone.trim(),notes:'',createdAt:q.date});
    closeModal(); toast(t('newBookingDone'),'ok'); await DB.flush(); render();
  }catch(e){ toast(e.message==='slot-taken'?t('noSlots'):e.message,'err'); }
}

/* ---------------- customers ---------------- */
function custStats(c){
  const as=DB.data.appointments.filter(a=>a.customerId===c.id&&a.status!=='cancelled');
  return {visits:as.length, spent:as.reduce((x,a)=>x+apptRevenue(a),0), last:as.length?as.map(a=>a.date).sort().pop():null};
}
function custsHTML(){
  const q=F.custQ.trim().toLowerCase();
  const list=DB.data.customers.filter(c=>!q||(c.name+' '+c.phone).toLowerCase().includes(q)).sort((a,b)=>a.name.localeCompare(b.name));
  let h='<div class="secttl"><h2>👥 '+esc(t('custs'))+'</h2><button class="btn btn-p btn-sm" onclick="custFormDlg()">＋ '+esc(t('addCust'))+'</button></div>';
  h+='<div class="toolbar"><input class="searchbox" placeholder="'+esc(t('search'))+'…" value="'+esc(F.custQ)+'" oninput="F.custQ=this.value;render()"></div>';
  if(!list.length) return h+'<div class="card"><div class="empty"><div class="e">👥</div>'+esc(t('noCusts'))+'</div></div>';
  h+='<div class="tblwrap"><table><tr><th>'+esc(t('thCustomer'))+'</th><th>'+esc(t('totalVisits'))+'</th><th>'+esc(t('totalSpent'))+'</th><th>'+esc(t('lastVisit'))+'</th><th>'+esc(t('thActions'))+'</th></tr>'
  +list.map(c=>{const s=custStats(c);
    return '<tr><td><b>'+esc(c.name)+'</b><div class="hint" style="margin:0">📞 '+esc(c.phone)+'</div></td><td>'+s.visits+'</td><td><b>'+esc(fmtMoney(s.spent))+'</b></td><td>'+(s.last?esc(fmtDateS(s.last)):'—')+'</td>'
    +'<td style="white-space:nowrap"><button class="iconbtn" onclick="custDlg(\''+c.id+'\')">👁 '+esc(t('view'))+'</button><button class="iconbtn" onclick="custFormDlg(\''+c.id+'\')">✏️</button><button class="iconbtn danger" onclick="delCust(\''+c.id+'\')">🗑</button></td></tr>';}).join('')+'</table></div>';
  return h;
}
function custDlg(id){
  const c=getCustomer(id); if(!c) return; const s=custStats(c);
  const hist=DB.data.appointments.filter(a=>a.customerId===id).sort((a,b)=>(b.date+pad(b.start)).localeCompare(a.date+pad(a.start)));
  openModal('<h3>👤 '+esc(c.name)+'</h3><div class="kv">📞 '+esc(c.phone)+'</div><div class="kv">📅 '+esc(t('custSince'))+': '+esc(fmtDateS(c.createdAt))+'</div>'
  +(c.notes?'<div class="kv">📝 '+esc(c.notes)+'</div>':'')
  +'<div class="grid3" style="margin:14px 0">'+statCard('c1','🗓️',s.visits,t('totalVisits'))+statCard('c3','💰',fmtMoney(s.spent),t('totalSpent'))+statCard('c2','⭐',DB.data.reviews.filter(r=>{const a=getAppt(r.appointmentId);return a&&a.customerId===id;}).length,t('reviews'))+'</div>'
  +'<h4 style="margin-bottom:8px">'+esc(t('history'))+'</h4>'
  +(hist.length?hist.slice(0,10).map(a=>{const sv=getService(a.serviceId);return '<div class="sumrow"><span class="k">'+esc(fmtDateS(a.date))+' · '+esc(fmtTime(a.start))+' — '+esc(tn(sv.name))+'</span>'+pill(a.status)+'</div>';}).join(''):'<p class="hint">'+esc(t('noAppts'))+'</p>')
  +'<div class="mrow"><button class="btn btn-g btn-sm" onclick="closeModal()">'+esc(t('close'))+'</button><button class="btn btn-p btn-sm" onclick="closeModal();custFormDlg(\''+id+'\')">'+esc(t('edit'))+'</button></div>');
}
function custFormDlg(id){
  const c=id?getCustomer(id):{name:'',phone:'',notes:''};
  openModal('<h3>'+(id?'✏️ ':'＋ ')+esc(t(id?'editCust':'addCust'))+'</h3>'
  +'<div class="fgroup"><label>'+esc(t('custName'))+' *</label><input id="cf-name" value="'+esc(c.name)+'"></div>'
  +'<div class="fgroup"><label>'+esc(t('custPhone'))+' *</label><input id="cf-phone" value="'+esc(c.phone)+'" inputmode="tel"></div>'
  +'<div class="fgroup"><label>'+esc(t('custNotes'))+'</label><textarea id="cf-notes" rows="2">'+esc(c.notes)+'</textarea></div>'
  +'<div class="mrow"><button class="btn btn-g btn-sm" onclick="closeModal()">'+esc(t('cancel'))+'</button><button class="btn btn-p btn-sm" onclick="saveCust(\''+(id||'')+'\')">'+esc(t('save'))+'</button></div>');
}
function saveCust(id){
  const n=$('#cf-name').value.trim(), p=$('#cf-phone').value.trim();
  if(!n||!validPhone(p)){ toast(t('badPhone'),'err'); return; }
  if(id){ const c=getCustomer(id); c.name=n; c.phone=p; c.notes=$('#cf-notes').value.trim(); toast(t('custUpdated'),'ok'); }
  else{ DB.data.customers.push({id:uid('cus'),name:n,phone:p,notes:$('#cf-notes').value.trim(),createdAt:todayStr()}); toast(t('custAdded'),'ok'); }
  DB.save(); closeModal(); render();
}
function delCust(id){ confirmDlg(t('confirmDelete'),()=>{ DB.data.customers=DB.data.customers.filter(c=>c.id!==id); DB.save(); toast(t('custDeleted'),'ok'); render(); }); }

/* ---------------- services ---------------- */
function uniqCats(){
  const m={}; DB.data.services.forEach(s=>{const k=(s.cat.en||'')+'|'+(s.cat.si||''); if(!m[k]) m[k]=s.cat;});
  return Object.values(m);
}
function servsHTML(){
  let h='<div class="secttl"><h2>✂️ '+esc(t('servs'))+'</h2><button class="btn btn-p btn-sm" onclick="svcFormDlg()">＋ '+esc(t('addService'))+'</button></div>';
  const svcs=DB.data.services;
  if(!svcs.length) return h+'<div class="card"><div class="empty"><div class="e">✂️</div>'+esc(t('noServs'))+'</div></div>';
  h+='<div class="optgrid">'+svcs.map(s=>{
    const bk=DB.data.appointments.filter(a=>a.serviceId===s.id&&a.status!=='cancelled').length;
    return '<div class="opt" style="cursor:default;'+(s.active?'':'opacity:.6')+'"><div class="t">'+esc(tn(s.name))+'</div>'
    +'<div><span class="chip">'+esc(tn(s.cat))+'</span> '+(s.active?'<span class="chip" style="background:var(--ok-l);color:var(--ok)">'+esc(t('active'))+'</span>':'<span class="chip" style="background:#eee;color:#999">'+esc(t('cancelled'))+'</span>')+'</div>'
    +'<div class="p"><span class="price">'+esc(fmtMoney(s.price))+'</span><span class="dur">⏱ '+esc(fmtDur(s.duration))+'</span></div>'
    +'<div class="hint">📋 '+bk+' '+esc(t('byBookings'))+'</div>'
    +'<div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap"><button class="iconbtn" onclick="toggleSvc(\''+s.id+'\')">'+(s.active?'⏸':'▶')+'</button><button class="iconbtn" onclick="svcFormDlg(\''+s.id+'\')">✏️ '+esc(t('edit'))+'</button><button class="iconbtn danger" onclick="delSvc(\''+s.id+'\')">🗑</button></div></div>';}).join('')+'</div>';
  return h;
}
function svcFormDlg(id){
  const s=id?getService(id):{name:{en:'',si:''},price:'',duration:30,cat:{en:'',si:''},active:true};
  const cats=uniqCats();
  openModal('<h3>'+(id?'✏️ ':'＋ ')+esc(t(id?'editService':'addService'))+'</h3>'
  +'<div class="frow"><div class="fgroup"><label>'+esc(t('svcName'))+' (EN) *</label><input id="sf-ne" value="'+esc(s.name.en||'')+'"></div>'
  +'<div class="fgroup"><label>'+esc(t('svcName'))+' (සිං) *</label><input id="sf-ns" value="'+esc(s.name.si||'')+'"></div></div>'
  +'<div class="frow"><div class="fgroup"><label>'+esc(t('priceRs'))+' *</label><input id="sf-p" type="number" min="0" value="'+esc(s.price)+'"></div>'
  +'<div class="fgroup"><label>'+esc(t('durMin'))+' *</label><input id="sf-d" type="number" min="5" step="5" value="'+esc(s.duration)+'"></div></div>'
  +'<div class="frow"><div class="fgroup"><label>'+esc(t('category'))+' (EN)</label><input id="sf-ce" list="cat-en" value="'+esc(s.cat.en||'')+'"><datalist id="cat-en">'+cats.map(c=>'<option value="'+esc(c.en)+'">').join('')+'</datalist></div>'
  +'<div class="fgroup"><label>'+esc(t('category'))+' (සිං)</label><input id="sf-cs" list="cat-si" value="'+esc(s.cat.si||'')+'"><datalist id="cat-si">'+cats.map(c=>'<option value="'+esc(c.si)+'">').join('')+'</datalist></div></div>'
  +'<div class="mrow"><button class="btn btn-g btn-sm" onclick="closeModal()">'+esc(t('cancel'))+'</button><button class="btn btn-p btn-sm" onclick="saveSvc(\''+(id||'')+'\')">'+esc(t('save'))+'</button></div>');
}
function saveSvc(id){
  const ne=$('#sf-ne').value.trim(), ns=$('#sf-ns').value.trim(), p=+$('#sf-p').value, d=+$('#sf-d').value;
  if(!ne||!ns){ toast(t('fillRequired'),'err'); return; }
  if(!(p>=0)||!(d>0)){ toast(t('invalidNum'),'err'); return; }
  const cat={en:$('#sf-ce').value.trim()||'General',si:$('#sf-cs').value.trim()||'සාමාන්‍ය'};
  if(id){ const s=getService(id); Object.assign(s,{name:{en:ne,si:ns},price:p,duration:d,cat}); toast(t('svcUpdated'),'ok'); }
  else{ DB.data.services.push({id:uid('svc'),name:{en:ne,si:ns},price:p,duration:d,cat,active:true}); toast(t('svcAdded'),'ok'); }
  DB.save(); closeModal(); render();
}
function toggleSvc(id){ const s=getService(id); s.active=!s.active; DB.save(); render(); }
function delSvc(id){
  const upcoming=DB.data.appointments.some(a=>a.serviceId===id&&a.date>=todayStr()&&['pending','confirmed'].includes(a.status));
  if(upcoming){ const s=getService(id); s.active=false; DB.save(); toast(t('hasBookingsWarn'),'err'); render(); return; }
  confirmDlg(t('delSvcQ'),()=>{ DB.data.services=DB.data.services.filter(s=>s.id!==id); DB.data.staff.forEach(st=>st.services=st.services.filter(x=>x!==id)); DB.save(); toast(t('svcDeleted'),'ok'); render(); });
}

/* ---------------- staff ---------------- */
function staffHTML(){
  let h='<div class="secttl"><h2>🧑‍💼 '+esc(t('staffT'))+'</h2><button class="btn btn-p btn-sm" onclick="stfFormDlg()">＋ '+esc(t('addStaff'))+'</button></div>';
  const list=DB.data.staff;
  if(!list.length) return h+'<div class="card"><div class="empty"><div class="e">🧑‍💼</div>'+esc(t('noStaff'))+'</div></div>';
  h+='<div class="optgrid">'+list.map(s=>{
    const n=DB.data.appointments.filter(a=>a.staffId===s.id&&a.status!=='cancelled').length;
    return '<div class="opt" style="cursor:default;'+(s.active?'':'opacity:.6')+'"><div class="avatar">'+esc(initials(s.name))+'</div><div class="t">'+esc(s.name)+'</div><div class="d">'+esc(tn(s.role))+(s.phone?' · '+esc(s.phone):'')+'</div>'
    +'<div style="margin:8px 0">'+s.services.map(id=>{const sv=getService(id);return sv?'<span class="chip">'+esc(tn(sv.name))+'</span>':'';}).join('')+'</div>'
    +'<div class="hint">📋 '+n+' '+esc(t('byBookings'))+(s.daysOff&&s.daysOff.length?' · 🚫 '+s.daysOff.length+' '+esc(t('daysUnit')):'')+'</div>'
    +'<div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap"><button class="iconbtn" onclick="toggleStf(\''+s.id+'\')">'+(s.active?'⏸':'▶')+'</button><button class="iconbtn" onclick="stfFormDlg(\''+s.id+'\')">✏️ '+esc(t('edit'))+'</button><button class="iconbtn danger" onclick="delStf(\''+s.id+'\')">🗑</button></div></div>';}).join('')+'</div>';
  return h;
}
function stfFormDlg(id){
  const s=id?getStaff(id):{name:'',phone:'',role:{en:'',si:''},services:[],daysOff:[],active:true};
  window._stfDays=(s.daysOff||[]).slice();
  window._stfSvcs=(s.services||[]).slice();
  openModal('<h3>'+(id?'✏️ ':'＋ ')+esc(t(id?'editStaff':'addStaff'))+'</h3>'
  +'<div class="frow"><div class="fgroup"><label>'+esc(t('staffName'))+' *</label><input id="tf-n" value="'+esc(s.name)+'"></div>'
  +'<div class="fgroup"><label>'+esc(t('custPhone'))+'</label><input id="tf-p" value="'+esc(s.phone||'')+'" inputmode="tel"></div></div>'
  +'<div class="frow"><div class="fgroup"><label>'+esc(t('role'))+' (EN)</label><input id="tf-re" value="'+esc(s.role.en||'')+'"></div>'
  +'<div class="fgroup"><label>'+esc(t('role'))+' (සිං)</label><input id="tf-rs" value="'+esc(s.role.si||'')+'"></div></div>'
  +'<div class="fgroup"><label>'+esc(t('canDo'))+' *</label><div id="tf-svcs">'+DB.data.services.map(sv=>'<label style="display:inline-flex;gap:6px;align-items:center;margin:4px 10px 4px 0;font-size:14px;cursor:pointer"><input type="checkbox" value="'+sv.id+'"'+(window._stfSvcs.includes(sv.id)?' checked':'')+' onchange="stfSvcTgl(this)"> '+esc(tn(sv.name))+'</label>').join('')+'</div></div>'
  +'<div class="fgroup"><label>'+esc(t('daysOff'))+'</label><div id="tf-days" style="margin-bottom:8px"></div><div style="display:flex;gap:8px"><input type="date" id="tf-dayadd" min="'+todayStr()+'"><button class="btn btn-g btn-sm" onclick="stfDayAdd()">'+esc(t('addDate'))+'</button></div></div>'
  +'<div class="mrow"><button class="btn btn-g btn-sm" onclick="closeModal()">'+esc(t('cancel'))+'</button><button class="btn btn-p btn-sm" onclick="saveStf(\''+(id||'')+'\')">'+esc(t('save'))+'</button></div>');
  renderStfDays();
}
function stfSvcTgl(cb){ const v=cb.value; window._stfSvcs = cb.checked? [...new Set([...window._stfSvcs,v])] : window._stfSvcs.filter(x=>x!==v); }
function renderStfDays(){ $('#tf-days').innerHTML=window._stfDays.sort().map(d=>'<span class="chip">🚫 '+esc(fmtDateS(d))+' <a href="#" onclick="window._stfDays=window._stfDays.filter(x=>x!==\''+d+'\');renderStfDays();return false" style="color:var(--danger)">✖</a></span>').join('')||'<span class="hint">—</span>'; }
function stfDayAdd(){ const d=$('#tf-dayadd').value; if(d&&!window._stfDays.includes(d)){ window._stfDays.push(d); renderStfDays(); } }
function saveStf(id){
  const n=$('#tf-n').value.trim();
  if(!n){ toast(t('fillRequired'),'err'); return; }
  if(!window._stfSvcs.length){ toast(t('needOneSvc'),'err'); return; }
  const rec={name:n,phone:$('#tf-p').value.trim(),role:{en:$('#tf-re').value.trim(),si:$('#tf-rs').value.trim()},services:window._stfSvcs.slice(),daysOff:window._stfDays.slice()};
  if(id){ Object.assign(getStaff(id),rec); toast(t('staffUpdated'),'ok'); }
  else{ DB.data.staff.push(Object.assign({id:uid('stf'),active:true},rec)); toast(t('staffAdded'),'ok'); }
  DB.save(); closeModal(); render();
}
function toggleStf(id){ const s=getStaff(id); s.active=!s.active; DB.save(); render(); }
function delStf(id){
  const upcoming=DB.data.appointments.some(a=>a.staffId===id&&a.date>=todayStr()&&['pending','confirmed'].includes(a.status));
  if(upcoming){ getStaff(id).active=false; DB.save(); toast(t('hasBookingsWarn'),'err'); render(); return; }
  confirmDlg(t('delStaffQ'),()=>{ DB.data.staff=DB.data.staff.filter(s=>s.id!==id); DB.save(); toast(t('staffDeleted'),'ok'); render(); });
}

/* ---------------- reports ---------------- */
function repsHTML(){
  const counts={pending:0,confirmed:0,completed:0,cancelled:0,noshow:0};
  DB.data.appointments.forEach(a=>counts[a.status]=(counts[a.status]||0)+1);
  const bySvc={};
  DB.data.appointments.forEach(a=>{ if(a.status!=='cancelled') bySvc[a.serviceId]=(bySvc[a.serviceId]||0)+1; });
  const top=Object.entries(bySvc).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const maxTop=Math.max(...top.map(x=>x[1]),1);
  let h='<div class="secttl"><h2>📈 '+esc(t('reps'))+'</h2></div>';
  h+='<div class="card"><h3>'+esc(t('rev14'))+'</h3><canvas id="revchart" style="width:100%;height:170px"></canvas></div>';
  h+='<div class="grid2" style="margin-top:18px"><div class="card"><h3>'+esc(t('topServs'))+'</h3>'
    +(top.length? top.map(([id,n])=>{const s=getService(id);return '<div class="bar-row"><span class="bl">'+esc(tn(s.name))+'</span><div class="bar-track"><div class="bar-fill" style="width:'+Math.round(n/maxTop*100)+'%"></div></div><span class="bv">'+n+'</span></div>';}).join(''):'<p class="hint">'+esc(t('noData'))+'</p>')+'</div>';
  h+='<div class="card"><h3>'+esc(t('fStatus'))+'</h3><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">'
    +Object.keys(counts).map(k=>'<div class="stat" style="flex:1;min-width:110px;padding:14px"><div class="l">'+esc(t(k==='noshow'?'noshow':k))+'</div><div class="v" style="font-size:24px">'+counts[k]+'</div></div>').join('')+'</div></div></div>';
  h+='<div class="card" style="margin-top:18px"><div class="secttl"><h3>💬 SMS '+esc(lang==='si'?'සටහන':'log')+'</h3><button class="iconbtn" onclick="loadSmsLog()">↻</button></div><div id="smslog"><p class="hint">…</p></div></div>';
  return h;
}
async function loadSmsLog(){
  const el=$('#smslog'); if(!el) return;
  try{
    const r=await API.req('/api/admin/sms-log');
    el.innerHTML = r.log.length? r.log.slice(0,25).map(x=>{
      const d=new Date(x.created_at);
      return '<div class="sumrow"><span class="k">📱 '+esc(x.phone)+'<div class="hint" style="margin:0">'+esc(String(x.message).slice(0,100))+'</div><div class="hint" style="margin:0">'+d.toLocaleString()+' · '+esc(x.provider)+'</div></span><span class="pill '+(x.status==='sent'?'completed':'cancelled')+'">'+esc(x.status)+'</span></div>';
    }).join('') : '<p class="hint">'+esc(t('noData'))+'</p>';
  }catch(e){ el.innerHTML='<p class="hint">—</p>'; }
}
function drawRevChart(){
  const cv=$('#revchart'); if(!cv) return;
  const days=[]; for(let i=13;i>=0;i--){ const ds=addDays(todayStr(),-i); days.push({ds,v:DB.data.appointments.filter(a=>a.date===ds).reduce((x,a)=>x+apptRevenue(a),0)}); }
  const max=Math.max.apply(null,days.map(d=>d.v).concat([1]));
  const W=cv.width=cv.offsetWidth*2, H=cv.height=340, ctx=cv.getContext('2d');
  const bw=W/days.length;
  ctx.clearRect(0,0,W,H);
  days.forEach((d,i)=>{
    const bh=Math.max(6,(H-70)*(d.v/max)), x=i*bw+bw*0.2, w=bw*0.6, y=H-50-bh;
    const g=ctx.createLinearGradient(0,y,0,y+bh); g.addColorStop(0,'#8b5cf6'); g.addColorStop(1,'#6d28d9');
    ctx.fillStyle=g;
    if(ctx.roundRect){ ctx.beginPath(); ctx.roundRect(x,y,w,bh,10); ctx.fill(); } else { ctx.fillRect(x,y,w,bh); }
    ctx.fillStyle='#7a748c'; ctx.font='600 20px Inter'; ctx.textAlign='center';
    ctx.fillText(fmtDateS(d.ds), x+w/2, H-22);
    if(d.v>0){ ctx.fillStyle='#211d2e'; ctx.font='700 20px Inter'; ctx.fillText(d.v>=1000?(d.v/1000).toFixed(1)+'k':d.v, x+w/2, y-10); }
  });
}

/* ---------------- settings ---------------- */
function settHTML(){
  const b=DB.data.business;
  let h='<div class="secttl"><h2>⚙️ '+esc(t('sett'))+'</h2></div>';
  h+='<div class="card" style="margin-bottom:18px"><h3>🏢 '+esc(t('bizProfile'))+'</h3><div class="grid2">'
    +'<div class="fgroup"><label>'+esc(t('bizName'))+'</label><input id="st-name" value="'+esc(b.name)+'"></div>'
    +'<div class="fgroup"><label>'+esc(t('contactNo'))+'</label><input id="st-phone" value="'+esc(b.phone)+'"></div></div>'
    +'<div class="fgroup"><label>'+esc(t('address'))+'</label><input id="st-addr" value="'+esc(b.address)+'"></div>'
    +'<div class="fgroup"><label>'+esc(t('shortDesc'))+' (EN)</label><textarea id="st-ae" rows="2">'+esc(b.about.en||'')+'</textarea></div>'
    +'<div class="fgroup"><label>'+esc(t('shortDesc'))+' (සිං)</label><textarea id="st-as" rows="2">'+esc(b.about.si||'')+'</textarea></div>'
    +'<button class="btn btn-p btn-sm" onclick="saveProfile()">💾 '+esc(t('save'))+'</button></div>';
  h+='<div class="card" style="margin-bottom:18px"><h3>🕘 '+esc(t('hoursTitle'))+'</h3>'+hoursEditorHTML('set',b.hours)
    +'<button class="btn btn-p btn-sm" style="margin-top:12px" onclick="saveHours()">💾 '+esc(t('save'))+'</button></div>';
  h+='<div class="card" style="margin-bottom:18px"><h3>🚫 '+esc(t('holidays'))+'</h3><div id="hol-list" style="margin-bottom:10px">'
    +(b.holidays.map((x,i)=>'<span class="chip">📅 '+esc(fmtDateS(x.date))+' '+esc(x.name)+' <a href="#" onclick="delHoliday('+i+');return false" style="color:var(--danger)">✖</a></span>').join('')||'<span class="hint">—</span>')+'</div>'
    +'<div class="frow"><div class="fgroup"><label>'+esc(t('holName'))+'</label><input id="hol-name" placeholder="'+esc(t('holNamePh'))+'"></div>'
    +'<div class="fgroup"><label>'+esc(t('holDate'))+'</label><input id="hol-date" type="date" min="'+todayStr()+'"></div></div>'
    +'<button class="btn btn-g btn-sm" onclick="addHoliday()">＋ '+esc(t('addHoliday'))+'</button></div>';
  h+='<div class="card" style="margin-bottom:18px"><h3>⏱️ '+esc(t('bufferLbl'))+'</h3><div class="frow"><div class="fgroup"><input id="buf-num" type="number" min="0" max="120" step="5" value="'+(b.bufferMin||0)+'"><p class="hint">'+esc(t('bufferHint'))+'</p></div><div class="fgroup"><label>&nbsp;</label><button class="btn btn-p btn-sm" onclick="saveBuffer()">💾 '+esc(t('save'))+'</button></div></div></div>';
  h+='<div class="card" style="border:1px solid var(--danger-l)"><h3>💾 '+esc(t('dataMgmt'))+'</h3><div style="display:flex;gap:10px;flex-wrap:wrap">'
    +'<button class="btn btn-g btn-sm" onclick="download(\'bookeasy-backup.json\',JSON.stringify(DB.data))">⬇️ '+esc(t('downloadBackup'))+'</button>'
    +'<label class="btn btn-g btn-sm" style="cursor:pointer">⬆️ '+esc(t('restoreBackup'))+'<input type="file" id="rs-file" accept=".json" style="display:none" onchange="restoreBackup(this)"></label>'
    +'<button class="btn btn-danger btn-sm" onclick="resetAll()">🧨 '+esc(t('startFresh'))+'</button></div>'
    +'<p class="hint" style="margin-top:10px">'+esc(t('restoreWarn'))+' '+esc(t('eraseWarn'))+'</p></div>';
  return h;
}
function saveProfile(){ const b=DB.data.business; b.name=$('#st-name').value.trim()||b.name; b.phone=$('#st-phone').value.trim(); b.address=$('#st-addr').value.trim(); b.about={en:$('#st-ae').value.trim(),si:$('#st-as').value.trim()}; DB.save(); toast(t('settingsSaved'),'ok'); }
function saveHours(){ DB.data.business.hours=readHoursEditor('set'); DB.save(); toast(t('settingsSaved'),'ok'); }
function addHoliday(){ const d=$('#hol-date').value, n=$('#hol-name').value.trim(); if(!d||!n){toast(t('fillRequired'),'err');return;} DB.data.business.holidays.push({date:d,name:n}); DB.save(); toast(t('holAdded'),'ok'); render(); }
function delHoliday(i){ DB.data.business.holidays.splice(i,1); DB.save(); toast(t('holRemoved'),'ok'); render(); }
function saveBuffer(){ DB.data.business.bufferMin=Math.max(0,+$('#buf-num').value||0); DB.save(); toast(t('settingsSaved'),'ok'); }
function restoreBackup(inp){
  const f=inp.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=()=>{ try{ const d=JSON.parse(r.result); if(!d.business||!d.services||!d.staff) throw 0; DB.data=d; DB.save(); toast(t('settingsSaved'),'ok'); render(); }catch(e){ toast(t('invalidNum'),'err'); } };
  r.readAsText(f);
}
function resetAll(){ confirmDlg(t('eraseQ'),async function(){ try{ await API.req('/api/admin/reset',{method:'DELETE'}); }catch(e){} API.token=null; localStorage.removeItem('bk_token'); DB.isAdmin=false; DB.data=null; view='book'; setupStep=0; await DB.load(); render(); },t('yesDelete')); }

/* ---------------- boot ---------------- */
document.body.classList.toggle('si',lang==='si');
applyLang();
(async function boot(){
  if(API.token) DB.isAdmin=true;
  await DB.load();
  if(DB.isAdmin&&!DB.data){ DB.isAdmin=false; API.token=null; localStorage.removeItem('bk_token'); await DB.load(); }
  render();
})();

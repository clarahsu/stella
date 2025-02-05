<template>
  <div class="dokumente-container">
    <h1>Dokumente</h1>
    <center><p>Hier finden sie alle relevanten Bescheinigungen für ihr Studium.</p></center>
    <ul>
      <li><a href="https://example.com/dummy1.pdf" target="_blank">Bescheinigung nach §9 BAföG [PDF]</a></li>
      <li><a href="https://example.com/dummy2.pdf" target="_blank">Gebührenaufstellung [PDF]</a></li>
      <li><a href="https://example.com/dummy3.pdf" target="_blank">Immatrikulationsbescheinigung (Deutsch) [PDF]</a></li>
      <li><a href="https://example.com/dummy4.pdf" target="_blank">Immatrikulationsbescheinigung (Englisch) [PDF]</a></li>
      <li><a href="https://example.com/dummy5.pdf" target="_blank">Studienverlaufsbescheinigung [PDF]</a></li>
      <br>
      <li><strong>Bescheinigungen für Noten und Prüfungen:</strong></li>
      <li><a href="https://example.com/dummy6.pdf" target="_blank">Angemeldete Prüfungen [PDF]</a></li>
      <li><a href="https://example.com/dummy7.pdf" target="_blank">Notenbescheinigung (Deutsch) [PDF]</a></li>
      <li><a href="https://example.com/dummy8.pdf" target="_blank">Notenbescheinigung (Englisch) [PDF]</a></li>
    </ul>
  </div>
</template>

<style scoped>
.dokumente-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px; /* Abstand oben verringert */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}
</style>
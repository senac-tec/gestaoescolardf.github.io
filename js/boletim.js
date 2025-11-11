// Boletim System
class BoletimManager {
    constructor() {
        this.studentId = this.getStudentIdFromURL();
        this.currentBimestre = 2;
        this.gradesChart = null;
        this.attendanceChart = null;
        this.init();
    }

    init() {
        this.loadStudentInfo();
        this.loadBoletimData();
    }

    getStudentIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || 1; // Default to student ID 1
    }

    async loadStudentInfo() {
        try {
            // Buscar dados reais do aluno
            const alunos = await window.dbIntegration.getAlunos();
            const aluno = alunos.find(a => a.id == this.studentId) || alunos[0];
            
            if (!aluno) {
                throw new Error('Aluno não encontrado');
            }

            // Buscar matrícula do aluno
            const matriculas = await window.dbIntegration.getMatriculas();
            const matricula = matriculas.find(m => m.aluno_id == aluno.id);
            
            // Buscar turma se houver matrícula
            let turmaInfo = 'Não matriculado';
            if (matricula) {
                const turmas = await window.dbIntegration.getTurmas();
                const turma = turmas.find(t => t.id == matricula.turma_id);
                if (turma) {
                    turmaInfo = `${turma.nome} - ${turma.turno}`;
                }
            }
            
            document.getElementById('studentName').textContent = aluno.nome;
            document.getElementById('studentClass').textContent = turmaInfo;
            document.getElementById('studentId').textContent = `Matrícula: ${aluno.id.toString().padStart(7, '0')}`;
        } catch (error) {
            console.error('Erro ao carregar dados do aluno:', error);
            window.dbIntegration.showNotification('Erro ao carregar dados do aluno', 'error');
        }
    }

    getStudentData() {
        // Simulated student data - in real app would come from API
        const students = {
            1: {
                nome: 'João Silva',
                turma: '9º Ano A',
                turno: 'Matutino',
                matricula: '2025001'
            },
            2: {
                nome: 'Maria Santos',
                turma: '8º Ano B',
                turno: 'Vespertino',
                matricula: '2025002'
            },
            3: {
                nome: 'Pedro Costa',
                turma: '1º Ano C',
                turno: 'Matutino',
                matricula: '2025003'
            }
        };
        return students[this.studentId] || students[1];
    }

    async loadBoletimData() {
        try {
            this.currentBimestre = parseInt(document.getElementById('bimestreSelect').value);
            
            // Buscar dados reais do banco
            const boletimData = await this.getBoletimDataFromDB();
            
            this.updatePerformanceOverview(boletimData);
            this.updateGradesTable(boletimData.disciplinas);
            this.updateAttendanceDetails(boletimData);
            this.createCharts(boletimData.disciplinas);
        } catch (error) {
            console.error('Erro ao carregar dados do boletim:', error);
            window.dbIntegration.showNotification('Erro ao carregar boletim', 'error');
            
            // Fallback para dados simulados
            const boletimData = this.generateBoletimData();
            this.updatePerformanceOverview(boletimData);
            this.updateGradesTable(boletimData.disciplinas);
            this.updateAttendanceDetails(boletimData);
            this.createCharts(boletimData.disciplinas);
        }
    }

    async getBoletimDataFromDB() {
        try {
            // Buscar matrículas do aluno
            const matriculas = await window.dbIntegration.getMatriculas();
            const matriculaAluno = matriculas.find(m => m.aluno_id == this.studentId);
            
            if (!matriculaAluno) {
                throw new Error('Aluno não possui matrícula ativa');
            }

            // Buscar notas do aluno para o bimestre atual
            const todasNotas = await window.dbIntegration.getNotas();
            const notasAluno = todasNotas.filter(n => 
                n.matricula_id == matriculaAluno.id && 
                n.bimestre == this.currentBimestre
            );

            // Buscar frequência do aluno
            const frequenciaData = await window.dbIntegration.getFrequencia();
            const frequenciaAluno = frequenciaData.filter(f => f.matricula_id == matriculaAluno.id);

            // Buscar professores
            const professores = await window.dbIntegration.getProfessores();

            // Organizar dados por disciplina
            const disciplinasMap = new Map();
            
            // Processar notas
            notasAluno.forEach(nota => {
                if (!disciplinasMap.has(nota.disciplina)) {
                    disciplinasMap.set(nota.disciplina, {
                        nome: nota.disciplina,
                        professor: this.getRandomProfessor(professores).nome,
                        nota: nota.nota,
                        frequencia: 0,
                        faltas: 0,
                        totalAulas: 40,
                        status: this.getStatusFromNota(nota.nota)
                    });
                }
            });

            // Processar frequência
            const totalDias = frequenciaAluno.length;
            const diasPresentes = frequenciaAluno.filter(f => f.presente === 1).length;
            const frequenciaGeral = totalDias > 0 ? (diasPresentes / totalDias) * 100 : 100;

            // Se não há notas, usar dados simulados
            if (disciplinasMap.size === 0) {
                return this.generateBoletimData();
            }

            const disciplinas = Array.from(disciplinasMap.values()).map(d => ({
                ...d,
                frequencia: frequenciaGeral,
                faltas: Math.max(0, totalDias - diasPresentes)
            }));

            const mediaGeral = disciplinas.reduce((sum, d) => sum + d.nota, 0) / disciplinas.length;
            const totalFaltas = disciplinas.reduce((sum, d) => sum + d.faltas, 0);
            const totalAulas = disciplinas.reduce((sum, d) => sum + d.totalAulas, 0);

            return {
                disciplinas,
                mediaGeral: parseFloat(mediaGeral.toFixed(1)),
                frequenciaGeral: parseFloat(frequenciaGeral.toFixed(1)),
                totalFaltas,
                totalAulas,
                diasLetivos: totalDias || 50,
                diasPresentes: diasPresentes || 44
            };

        } catch (error) {
            console.error('Erro ao buscar dados do banco:', error);
            throw error;
        }
    }

    getRandomProfessor(professores) {
        if (professores.length === 0) {
            return { nome: 'Professor não atribuído' };
        }
        return professores[Math.floor(Math.random() * professores.length)];
    }

    getStatusFromNota(nota) {
        if (nota >= 7.0) return 'approved';
        if (nota >= 5.0) return 'recovery';
        return 'failed';
    }

    generateBoletimData() {
        const disciplinas = [
            {
                nome: 'Matemática',
                professor: 'Prof. Maria Silva',
                nota: 8.5,
                frequencia: 95,
                faltas: 2,
                totalAulas: 40,
                status: 'approved'
            },
            {
                nome: 'Português',
                professor: 'Prof. João Santos',
                nota: 7.8,
                frequencia: 90,
                faltas: 4,
                totalAulas: 40,
                status: 'approved'
            },
            {
                nome: 'História',
                professor: 'Prof. Ana Costa',
                nota: 9.2,
                frequencia: 98,
                faltas: 1,
                totalAulas: 40,
                status: 'approved'
            },
            {
                nome: 'Geografia',
                professor: 'Prof. Carlos Lima',
                nota: 7.0,
                frequencia: 85,
                faltas: 6,
                totalAulas: 40,
                status: 'recovery'
            },
            {
                nome: 'Ciências',
                professor: 'Prof. Pedro Oliveira',
                nota: 8.8,
                frequencia: 92,
                faltas: 3,
                totalAulas: 40,
                status: 'approved'
            },
            {
                nome: 'Inglês',
                professor: 'Prof. Sarah Brown',
                nota: 7.5,
                frequencia: 88,
                faltas: 5,
                totalAulas: 40,
                status: 'approved'
            },
            {
                nome: 'Educação Física',
                professor: 'Prof. Roberto Souza',
                nota: 9.5,
                frequencia: 100,
                faltas: 0,
                totalAulas: 40,
                status: 'approved'
            },
            {
                nome: 'Artes',
                professor: 'Prof. Lucia Martins',
                nota: 8.2,
                frequencia: 93,
                faltas: 3,
                totalAulas: 40,
                status: 'approved'
            }
        ];

        const mediaGeral = disciplinas.reduce((sum, d) => sum + d.nota, 0) / disciplinas.length;
        const totalFaltas = disciplinas.reduce((sum, d) => sum + d.faltas, 0);
        const totalAulas = disciplinas.reduce((sum, d) => sum + d.totalAulas, 0);
        const frequenciaGeral = ((totalAulas - totalFaltas) / totalAulas) * 100;

        return {
            disciplinas,
            mediaGeral: parseFloat(mediaGeral.toFixed(1)),
            frequenciaGeral: parseFloat(frequenciaGeral.toFixed(1)),
            totalFaltas,
            totalAulas,
            diasLetivos: 50,
            diasPresentes: 44
        };
    }

    updatePerformanceOverview(data) {
        document.getElementById('mediaGeral').textContent = data.mediaGeral.toFixed(1);
        document.getElementById('frequenciaGeral').textContent = data.frequenciaGeral.toFixed(0) + '%';
        document.getElementById('faltasTotal').textContent = data.totalFaltas;

        // Update status based on performance
        const statusGeral = document.getElementById('statusGeral');
        const statusFrequencia = document.getElementById('statusFrequencia');
        const statusFaltas = document.getElementById('statusFaltas');

        // Media status
        if (data.mediaGeral >= 7.0) {
            statusGeral.textContent = 'Aprovado';
            statusGeral.className = 'performance-status approved';
        } else if (data.mediaGeral >= 5.0) {
            statusGeral.textContent = 'Recuperação';
            statusGeral.className = 'performance-status warning';
        } else {
            statusGeral.textContent = 'Reprovado';
            statusGeral.className = 'performance-status danger';
        }

        // Frequency status
        if (data.frequenciaGeral >= 75) {
            statusFrequencia.textContent = 'Adequada';
            statusFrequencia.className = 'performance-status approved';
        } else {
            statusFrequencia.textContent = 'Insuficiente';
            statusFrequencia.className = 'performance-status danger';
        }

        // Absences status
        if (data.totalFaltas <= 10) {
            statusFaltas.textContent = 'Normal';
            statusFaltas.className = 'performance-status approved';
        } else if (data.totalFaltas <= 20) {
            statusFaltas.textContent = 'Atenção';
            statusFaltas.className = 'performance-status warning';
        } else {
            statusFaltas.textContent = 'Crítico';
            statusFaltas.className = 'performance-status danger';
        }
    }

    updateGradesTable(disciplinas) {
        const tbody = document.getElementById('gradesTableBody');
        tbody.innerHTML = '';

        disciplinas.forEach(disciplina => {
            const row = document.createElement('tr');
            
            const gradeClass = this.getGradeClass(disciplina.nota);
            const attendanceClass = this.getAttendanceClass(disciplina.frequencia);
            const statusClass = disciplina.status;

            row.innerHTML = `
                <td><strong>${disciplina.nome}</strong></td>
                <td>${disciplina.professor}</td>
                <td><span class="grade-value ${gradeClass}">${disciplina.nota.toFixed(1)}</span></td>
                <td><span class="attendance-percentage ${attendanceClass}">${disciplina.frequencia}%</span></td>
                <td>${disciplina.faltas}</td>
                <td><span class="subject-status ${statusClass}">${this.getStatusLabel(statusClass)}</span></td>
            `;
            
            tbody.appendChild(row);
        });
    }

    getGradeClass(nota) {
        if (nota >= 9.0) return 'excellent';
        if (nota >= 7.0) return 'good';
        if (nota >= 5.0) return 'average';
        return 'poor';
    }

    getAttendanceClass(frequencia) {
        if (frequencia >= 90) return 'good';
        if (frequencia >= 75) return 'warning';
        return 'danger';
    }

    getStatusLabel(status) {
        const labels = {
            approved: 'Aprovado',
            recovery: 'Recuperação',
            failed: 'Reprovado'
        };
        return labels[status] || 'Pendente';
    }

    updateAttendanceDetails(data) {
        const container = document.getElementById('attendanceSummary');
        
        container.innerHTML = `
            <div class="attendance-item">
                <h5>Dias Letivos</h5>
                <div class="attendance-value">${data.diasLetivos}</div>
                <div class="attendance-label">Total no bimestre</div>
            </div>
            <div class="attendance-item">
                <h5>Dias Presentes</h5>
                <div class="attendance-value">${data.diasPresentes}</div>
                <div class="attendance-label">Compareceu</div>
            </div>
            <div class="attendance-item">
                <h5>Faltas</h5>
                <div class="attendance-value">${data.totalFaltas}</div>
                <div class="attendance-label">Ausências</div>
            </div>
            <div class="attendance-item">
                <h5>Frequência</h5>
                <div class="attendance-value">${data.frequenciaGeral.toFixed(0)}%</div>
                <div class="attendance-label">Percentual</div>
            </div>
        `;
    }

    createCharts(disciplinas) {
        this.createGradesChart(disciplinas);
        this.createAttendanceChart(disciplinas);
    }

    createGradesChart(disciplinas) {
        const ctx = document.getElementById('gradesChart').getContext('2d');
        
        if (this.gradesChart) {
            this.gradesChart.destroy();
        }

        const labels = disciplinas.map(d => d.nome);
        const data = disciplinas.map(d => d.nota);
        const colors = data.map(nota => {
            if (nota >= 9.0) return '#10b981';
            if (nota >= 7.0) return '#3b82f6';
            if (nota >= 5.0) return '#f59e0b';
            return '#ef4444';
        });

        this.gradesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Notas',
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 1
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }

    createAttendanceChart(disciplinas) {
        const ctx = document.getElementById('attendanceChart').getContext('2d');
        
        if (this.attendanceChart) {
            this.attendanceChart.destroy();
        }

        const labels = disciplinas.map(d => d.nome);
        const data = disciplinas.map(d => d.frequencia);

        this.attendanceChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6',
                        '#06b6d4',
                        '#84cc16',
                        '#f97316'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
}

// Global functions
let boletimManager;

function loadBoletimData() {
    boletimManager.loadBoletimData();
}

function printBoletim() {
    window.print();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    boletimManager = new BoletimManager();
});
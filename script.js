document.addEventListener('DOMContentLoaded', function() {
    // Templates
    const experienceTemplate = `
        <div class="experience-item">
            <button type="button" class="remove-experience">×</button>
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="exp-title" placeholder="e.g. Software Developer">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="exp-company" placeholder="Company name">
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" class="exp-location" placeholder="City, State">
            </div>
            <div class="form-group" style="display: flex; gap: 10px;">
                <div style="flex: 1;">
                    <label>Start Date</label>
                    <input type="text" class="exp-start" placeholder="MM/YYYY">
                </div>
                <div style="flex: 1;">
                    <label>End Date</label>
                    <input type="text" class="exp-end" placeholder="MM/YYYY or Present">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="exp-description" placeholder="Describe your responsibilities and achievements"></textarea>
            </div>
        </div>
    `;
    
    const educationTemplate = `
        <div class="education-item">
            <button type="button" class="remove-education">×</button>
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="edu-degree" placeholder="e.g. Bachelor of Science in Computer Science">
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="edu-institution" placeholder="University or School name">
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" class="edu-location" placeholder="City, State">
            </div>
            <div class="form-group">
                <label>Graduation Date</label>
                <input type="text" class="edu-date" placeholder="MM/YYYY or Expected MM/YYYY">
            </div>
            <div class="form-group">
                <label>Description (Optional)</label>
                <textarea class="edu-description" placeholder="Additional information about your education"></textarea>
            </div>
        </div>
    `;

    // Auto-update function
    function autoUpdateField(inputId, targetId) {
        const input = document.getElementById(inputId);
        const target = document.getElementById(targetId);
        
        input.addEventListener('input', function() {
            target.textContent = this.value || target.dataset.default || '';
        });
    }

    // Basic fields
    autoUpdateField('fullName', 'resume-title');
    autoUpdateField('title', 'resume-subtitle');
    autoUpdateField('email', 'resume-email');
    autoUpdateField('phone', 'resume-phone');
    autoUpdateField('address', 'resume-address');
    autoUpdateField('summary', 'resume-summary');

    // Links
    document.getElementById('linkedin').addEventListener('input', updateLinks);
    document.getElementById('github').addEventListener('input', updateLinks);

    function updateLinks() {
        const linksContainer = document.getElementById('resume-links');
        linksContainer.innerHTML = '';
        
        const linkedin = document.getElementById('linkedin').value.trim();
        const github = document.getElementById('github').value.trim();
        
        if (linkedin) {
            const a = document.createElement('a');
            a.href = linkedin;
            a.textContent = 'LinkedIn';
            a.target = '_blank';
            linksContainer.appendChild(a);
            linksContainer.appendChild(document.createTextNode(' | '));
        }
        
        if (github) {
            const a = document.createElement('a');
            a.href = github;
            a.textContent = 'GitHub';
            a.target = '_blank';
            linksContainer.appendChild(a);
        }
        
        if (!linkedin && !github) {
            linksContainer.style.display = 'none';
        } else {
            linksContainer.style.display = 'block';
        }
    }

    // Skills
    document.getElementById('skills').addEventListener('input', function() {
        const skillsContainer = document.getElementById('resume-skills');
        skillsContainer.innerHTML = '';
        
        const skills = this.value.split(',').map(s => s.trim()).filter(s => s);
        
        if (skills.length === 0) {
            document.getElementById('resume-skills-section').style.display = 'none';
            return;
        }
        
        document.getElementById('resume-skills-section').style.display = 'block';
        
        skills.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'skill-item';
            span.textContent = skill;
            skillsContainer.appendChild(span);
        });
    });

    // Add experience
    document.getElementById('add-experience').addEventListener('click', function() {
        const container = document.getElementById('experience-container');
        const div = document.createElement('div');
        div.innerHTML = experienceTemplate;
        container.appendChild(div);
        
        const removeBtn = div.querySelector('.remove-experience');
        removeBtn.addEventListener('click', function() {
            container.removeChild(div);
            updateExperiencePreview();
        });
        
        const inputs = div.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updateExperiencePreview);
        });
        
        updateExperiencePreview();
    });

    // Add education
    document.getElementById('add-education').addEventListener('click', function() {
        const container = document.getElementById('education-container');
        const div = document.createElement('div');
        div.innerHTML = educationTemplate;
        container.appendChild(div);
        
        const removeBtn = div.querySelector('.remove-education');
        removeBtn.addEventListener('click', function() {
            container.removeChild(div);
            updateEducationPreview();
        });
        
        const inputs = div.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', updateEducationPreview);
        });
        
        updateEducationPreview();
    });

    // Update experience preview
    function updateExperiencePreview() {
        const container = document.getElementById('resume-experience');
        container.innerHTML = '';
        
        const experienceItems = document.querySelectorAll('.experience-item');
        
        if (experienceItems.length === 0) {
            document.getElementById('resume-experience-section').style.display = 'none';
            return;
        }
        
        document.getElementById('resume-experience-section').style.display = 'block';
        
        experienceItems.forEach(item => {
            const title = item.querySelector('.exp-title').value || 'Job Title';
            const company = item.querySelector('.exp-company').value || 'Company';
            const location = item.querySelector('.exp-location').value;
            const start = item.querySelector('.exp-start').value || 'Start Date';
            const end = item.querySelector('.exp-end').value || 'End Date';
            const description = item.querySelector('.exp-description').value || '';
            
            const expDiv = document.createElement('div');
            expDiv.className = 'resume-item';
            expDiv.innerHTML = `
                <div class="item-header">
                    <div>
                        <div class="resume-item-title">${title}</div>
                        <div class="resume-item-subtitle">${company}${location ? ', ' + location : ''}</div>
                    </div>
                    <div class="resume-item-date">${start} - ${end}</div>
                </div>
                ${description ? `<div class="resume-item-description">${description}</div>` : ''}
            `;
            container.appendChild(expDiv);
        });
    }

    // Update education preview
    function updateEducationPreview() {
        const container = document.getElementById('resume-education');
        container.innerHTML = '';
        
        const educationItems = document.querySelectorAll('.education-item');
        
        if (educationItems.length === 0) {
            document.getElementById('resume-education-section').style.display = 'none';
            return;
        }
        
        document.getElementById('resume-education-section').style.display = 'block';
        
        educationItems.forEach(item => {
            const degree = item.querySelector('.edu-degree').value || 'Degree';
            const institution = item.querySelector('.edu-institution').value || 'Institution';
            const location = item.querySelector('.edu-location').value;
            const date = item.querySelector('.edu-date').value || 'Date';
            const description = item.querySelector('.edu-description').value || '';
            
            const eduDiv = document.createElement('div');
            eduDiv.className = 'resume-item';
            eduDiv.innerHTML = `
                <div class="item-header">
                    <div>
                        <div class="resume-item-title">${degree}</div>
                        <div class="resume-item-subtitle">${institution}${location ? ', ' + location : ''}</div>
                    </div>
                    <div class="resume-item-date">${date}</div>
                </div>
                ${description ? `<div class="resume-item-description">${description}</div>` : ''}
            `;
            container.appendChild(eduDiv);
        });
    }

    // Generate resume
    document.getElementById('generate-resume').addEventListener('click', function() {
        updateLinks();
        updateExperiencePreview();
        updateEducationPreview();
        document.getElementById('skills').dispatchEvent(new Event('input'));
        alert('Resume preview updated!');
    });

    // Clear form
    document.getElementById('clear-form').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all form data? This cannot be undone.')) {
            document.getElementById('fullName').value = '';
            document.getElementById('title').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('address').value = '';
            document.getElementById('linkedin').value = '';
            document.getElementById('github').value = '';
            document.getElementById('summary').value = '';
            document.getElementById('skills').value = '';
            document.getElementById('experience-container').innerHTML = '';
            document.getElementById('education-container').innerHTML = '';
            document.getElementById('resume-title').textContent = 'Your Name';
            document.getElementById('resume-subtitle').textContent = 'Professional Title';
            document.getElementById('resume-email').textContent = 'email@example.com';
            document.getElementById('resume-phone').textContent = 'Phone Number';
            document.getElementById('resume-address').textContent = 'Address';
            document.getElementById('resume-links').innerHTML = '';
            document.getElementById('resume-summary').textContent = 'Your professional summary will appear here.';
            document.getElementById('resume-experience').innerHTML = '';
            document.getElementById('resume-education').innerHTML = '';
            document.getElementById('resume-skills').innerHTML = '';
            document.getElementById('resume-experience-section').style.display = 'none';
            document.getElementById('resume-education-section').style.display = 'none';
            document.getElementById('resume-skills-section').style.display = 'none';
        }
    });

    // ✅ Fixed Print/Save as PDF
    document.getElementById('print-btn').addEventListener('click', function() {
        const resumeContent = document.getElementById('resume').cloneNode(true);
        const printContainer = document.getElementById('print-resume');
        printContainer.innerHTML = '';
        printContainer.appendChild(resumeContent);
        window.print();
    });

    // Initialize with one experience and education field
    document.getElementById('add-experience').click();
    document.getElementById('add-education').click();

    // Hide empty sections initially
    document.getElementById('resume-experience-section').style.display = 'none';
    document.getElementById('resume-education-section').style.display = 'none';
    document.getElementById('resume-skills-section').style.display = 'none';
});

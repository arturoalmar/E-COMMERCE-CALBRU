import os

def split_css_file(filepath, markers):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    base_dir = os.path.dirname(filepath)
    base_name = os.path.basename(filepath).replace('.css', '')
    
    files = {}
    current_suffix = 'main'
    
    # Init main file
    files[current_suffix] = []
    
    for line in lines:
        for marker, suffix in markers.items():
            if marker in line:
                current_suffix = suffix
                if current_suffix not in files:
                    files[current_suffix] = []
                break
                
        if current_suffix not in files:
            files[current_suffix] = []
        files[current_suffix].append(line)
        
    # Write the sub files
    import_statements = []
    for suffix, content in files.items():
        if not content: continue
        
        # Ensure block is closed if necessary (basic check)
        if content[-1].strip() == '/* ==========================================================================':
            content.append('*/\n')
            
        out_name = f"{base_name}_{suffix}.css"
        out_path = os.path.join(base_dir, out_name)
        with open(out_path, 'w', encoding='utf-8') as f:
            f.writelines(content)
            
        import_statements.append(f"@import './{out_name}';\n")
        
    # Rewrite master file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(f"/* ARCHIVO MAESTRO - {base_name} */\n")
        f.writelines(import_statements)
        
    print(f"Splitted {filepath} into {len(files)} modules.")

# Definitions
intranet_markers = {
    'INTRANET SKETCH': 'sketch',
    'ENHANCED COMITE DE EMPRESA STYLES': 'comite',
    'PREMIUM INFOGRAPHICS': 'infographics',
    'TABS NAVIGATION': 'tabs',
    'LOGROS Y METAS STYLES': 'logros',
    'BENEFICIOS STYLES': 'beneficios',
    'SOPORTE IT STYLES': 'soporte',
    'INTRANET SUB-NAVIGATION': 'subnav'
}

adding_markers = {
    'CONFIGURADOR (EL CALDERO MAGICO)': 'layout',
    'TAMAÑO Y POSICIÓN DEL CALDERO CENTRAL': 'cauldron',
    'falling-particle': 'animations'
}

immersive_markers = {
    'LANDING IMMERSIVE': 'base',
    'VILLAGE SCENE / CABIN BACKGROUND': 'background',
    'TRANSITIONS': 'transitions',
    'ANIMATIONS': 'animations',
    'OVERLAYS': 'overlays',
    'village-bg-immersive': 'background',
    'keyframes': 'animations'
}

sketch_markers = {
    'SKETCH DESIGNS': 'base',
    'MODALS': 'modals',
    'CAROUSEL': 'carousel',
    'RESPONSIVE': 'responsive',
    'BUTTONS': 'buttons'
}

split_css_file(r'Intranet\IntranetPage.css', intranet_markers)
split_css_file(r'Adding-Ingredients\AddingIngredients.css', adding_markers)
split_css_file(r'Landing\LandingImmersive.css', immersive_markers)
split_css_file(r'Landing\LandingSketch.css', sketch_markers)

